import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { INITIAL_CANDIDATE } from './lib/seedData';
import { calculateMncReadinessScore } from './lib/skills/competencyEngine';

// Page Imports
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Aptitude from './pages/Prepare/Aptitude';
import DSA from './pages/Prepare/DSA';
import CoreCS from './pages/Prepare/CoreCS';
import SystemDesign from './pages/Prepare/SystemDesign';
import OOP from './pages/Prepare/OOP';
import Database from './pages/Prepare/Database';
import GitGithub from './pages/Prepare/GitGithub';
import Linux from './pages/Prepare/Linux';
import MockSession from './pages/Interviews/MockSession';
import FeedbackReport from './pages/Interviews/FeedbackReport';
import ResumeBuilder from './pages/Resume/ResumeBuilder';
import AtsAnalyzer from './pages/Resume/AtsAnalyzer';
import JobMatcher from './pages/Resume/JobMatcher';
import Analytics from './pages/Analytics';
import Roadmap from './pages/Roadmap';
import Companies from './pages/Companies';
import Settings from './pages/Settings';
import CoreEngineering from './pages/CoreEngineering';
import SubjectDetail from './pages/SubjectDetail';
import MySubjects from './pages/MySubjects';
import TechnicalSkills from './pages/TechnicalSkills';
import ExploreAll from './pages/ExploreAll';
import SubjectPractice from './pages/SubjectPractice';
import SkillProfile from './pages/SkillProfile';
import AdminLearningContent from './pages/Admin/AdminLearningContent';
import AuthPage from './pages/AuthPage';
import { ALL_SUBJECTS } from './lib/data/subjects';
import { supabase } from './lib/supabaseClient.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState('auth');
  const [candidate, setCandidate] = useState(INITIAL_CANDIDATE);
  const [authSession, setAuthSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const [adminRoleLoading, setAdminRoleLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRoleUserId, setAdminRoleUserId] = useState(null);
  const [lastSessionData, setLastSessionData] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('prepmate_theme') || 'dark';
  });

  useEffect(() => {
    let isMounted = true;
    let receivedAuthEvent = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      receivedAuthEvent = true;
      if (!isMounted) return;
      setAuthSession(session);
      setAuthLoading(false);
    });

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted || receivedAuthEvent) return;
      setAuthSession(error ? null : data.session);
      setAuthLoading(false);
    }).catch(() => {
      if (!isMounted || receivedAuthEvent) return;
      setAuthSession(null);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    if (!authSession?.access_token || !authSession.user?.id) {
      setCurrentUser(null);
      setSessionVerified(true);
      setIsAdmin(false);
      setAdminRoleUserId(null);
      setAdminRoleLoading(false);
      setCandidate(INITIAL_CANDIDATE);
      setCurrentTab('auth');
      return undefined;
    }

    setSessionVerified(false);
    setAdminRoleLoading(true);
    setIsAdmin(false);
    setAdminRoleUserId(null);
    supabase.auth.getUser().then(({ data, error }) => {
      if (!isActive) return;
      const verifiedUser = data?.user;
      if (error || !verifiedUser || verifiedUser.id !== authSession.user.id) {
        setCurrentUser(null);
        setAuthSession(null);
        setSessionVerified(true);
        void supabase.auth.signOut();
        return;
      }

      setCurrentUser(verifiedUser);
      setSessionVerified(true);
      setCurrentTab(tab => tab === 'auth' ? 'dashboard' : tab);
    }).catch(() => {
      if (!isActive) return;
      setCurrentUser(null);
      setAuthSession(null);
      setSessionVerified(true);
      void supabase.auth.signOut();
    });

    return () => {
      isActive = false;
    };
  }, [authSession?.access_token, authSession?.user?.id]);

  useEffect(() => {
    if (!currentUser?.id) return undefined;
    let isActive = true;
    const metadata = currentUser.user_metadata || {};
    setAdminRoleLoading(true);

    const loadProfileAndRole = async () => {
      let profile = null;
      const { data: existingProfile, error: profileReadError } = await supabase
        .from('profiles')
        .select('full_name, branch, target_role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (!profileReadError) {
        profile = existingProfile;
        if (!profile) {
          const profileToCreate = {
            id: currentUser.id,
            full_name: metadata.full_name || '',
            branch: metadata.branch || 'cs',
            target_role: metadata.target_role || 'Software Engineer'
          };
          const { data: createdProfile, error: profileCreateError } = await supabase
            .from('profiles')
            .upsert(profileToCreate, { onConflict: 'id' })
            .select('full_name, branch, target_role')
            .maybeSingle();
          if (!profileCreateError) profile = createdProfile;
        }
      }

      const { data: roles, error: roleReadError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', currentUser.id);

      if (!isActive) return;
      setCandidate(previous => ({
        ...previous,
        name: profile?.full_name || metadata.full_name || currentUser.email || previous.name,
        email: currentUser.email || previous.email,
        branch: profile?.branch || metadata.branch || previous.branch,
        targetRole: profile?.target_role || metadata.target_role || previous.targetRole,
        role: profile?.target_role || metadata.target_role || previous.role
      }));
      setIsAdmin(!roleReadError && Boolean(roles?.some(item => item.role === 'admin')));
      setAdminRoleUserId(currentUser.id);
      setAdminRoleLoading(false);
    };

    loadProfileAndRole().catch(() => {
      if (!isActive) return;
      setIsAdmin(false);
      setAdminRoleUserId(currentUser.id);
      setAdminRoleLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [currentUser?.id]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('prepmate_theme', theme);

    // Support direct navigation to /admin/learning-content or #admin
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('admin') || hash.includes('admin')) {
      setCurrentTab('admin-learning-content');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleStartMock = () => {
    setCurrentTab('interviews-mock');
  };

  const handleFinishInterview = (sessionResults) => {
    setLastSessionData(sessionResults);

    // Dynamic MNC Readiness Score bump
    const updatedCategoryScores = {
      ...candidate.categoryScores,
      technical: Math.min(100, candidate.categoryScores.technical + 3),
      systemDesign: Math.min(100, candidate.categoryScores.systemDesign + 4)
    };

    const newMncScore = calculateMncReadinessScore(updatedCategoryScores, candidate.branch);

    setCandidate(prev => ({
      ...prev,
      categoryScores: updatedCategoryScores,
      mncReadinessScore: newMncScore,
      scoreDelta: "+3 points from recent mock interview",
      recentInterviews: [
        {
          id: `int_${Date.now()}`,
          type: sessionResults.type || "Technical AI Mock",
          role: candidate.targetRole,
          date: "Just now",
          score: sessionResults.avgScore,
          status: "Completed",
          feedback: "Good response depth. Suggested reviewing core domain subjects."
        },
        ...prev.recentInterviews
      ]
    }));

    setCurrentTab('feedback-report');
  };

  const handleCompleteOnboarding = (onboardingData) => {
    setCandidate(prev => ({
      ...prev,
      branch: onboardingData.branch || 'cs',
      careerTrack: onboardingData.careerTrack || 'software',
      targetRole: onboardingData.targetRole,
      experienceLevel: onboardingData.experienceLevel,
      primaryStack: onboardingData.stack,
      targetCompanies: onboardingData.targetCompanies,
      timeline: onboardingData.timeline
    }));
    setCurrentTab('dashboard');
  };

  const handleAuthSuccess = () => {
    setCurrentTab('dashboard');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.warn('Supabase sign-out failed.');
  };

  const [selectedSubject, setSelectedSubject] = useState(null);
  const hasVerifiedSession = Boolean(
    sessionVerified && currentUser?.id && currentUser.id === authSession?.user?.id
  );
  const isCurrentUserAdmin = Boolean(isAdmin && adminRoleUserId === currentUser?.id && hasVerifiedSession);

  const renderContent = () => {
    if (currentTab.startsWith('prepare-')) {
      const subjectId = currentTab.replace('prepare-', '');
      const matchedSubject = ALL_SUBJECTS.find(s => s.id === subjectId || s.id.replace(/_/g, '') === subjectId.toLowerCase());
      if (matchedSubject) {
        return <SubjectDetail subject={matchedSubject} onBack={() => setCurrentTab('core-engineering')} onStartSubjectInterview={() => handleStartMock()} />;
      }
    }

    switch (currentTab) {
      case 'landing':
        return <Landing onStart={() => setCurrentTab('onboarding')} onExplore={() => setCurrentTab('dashboard')} />;
      case 'onboarding':
        return <Onboarding onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return <Dashboard candidate={candidate} onNavigate={setCurrentTab} onStartMock={handleStartMock} />;
      case 'my-subjects':
        return <MySubjects candidate={candidate} onSelectSubject={(subject) => {
          setSelectedSubject(subject);
          setCurrentTab('subject-detail');
        }} />;
      case 'core-engineering':
        return <CoreEngineering candidate={candidate} onSelectSubject={(subject) => {
          setSelectedSubject(subject);
          setCurrentTab('subject-detail');
        }} />;
      case 'technical-skills':
        return <TechnicalSkills candidate={candidate} onNavigate={setCurrentTab} />;
      case 'explore-all':
        return <ExploreAll onSelectSubject={(subject) => {
          setSelectedSubject(subject);
          setCurrentTab('subject-detail');
        }} />;
      case 'subject-practice':
        return <SubjectPractice candidate={candidate} onSelectSubject={(subject) => {
          setSelectedSubject(subject);
          setCurrentTab('subject-detail');
        }} />;
      case 'skill-profile':
        return <SkillProfile candidate={candidate} />;
      case 'subject-detail':
        return <SubjectDetail subject={selectedSubject || ALL_SUBJECTS[0]} onBack={() => setCurrentTab('core-engineering')} onStartSubjectInterview={() => handleStartMock()} />;
      case 'prepare-aptitude':
        return <Aptitude />;
      case 'prepare-dsa':
        return <DSA onCompleteProblem={() => {}} />;
      case 'prepare-corecs':
        return <CoreCS />;
      case 'prepare-oop':
        return <OOP />;
      case 'prepare-database':
        return <Database />;
      case 'prepare-git':
        return <GitGithub />;
      case 'prepare-linux':
        return <Linux />;
      case 'prepare-systemdesign':
        return <SystemDesign />;
      case 'interviews-technical':
      case 'interviews-hr':
      case 'interviews-fullmock':
      case 'interviews-mock':
        return <MockSession interviewType={currentTab} candidate={candidate} onFinishInterview={handleFinishInterview} />;
      case 'feedback-report':
        return <FeedbackReport sessionData={lastSessionData} onReturnDashboard={() => setCurrentTab('dashboard')} />;
      case 'resume-builder':
        return <ResumeBuilder onNavigateToAts={() => setCurrentTab('ats-analyzer')} />;
      case 'ats-analyzer':
        return <AtsAnalyzer />;
      case 'job-matcher':
        return <JobMatcher onOptimizeResume={() => setCurrentTab('resume-builder')} />;
      case 'analytics':
        return <Analytics candidate={candidate} />;
      case 'roadmap':
        return <Roadmap candidate={candidate} onNavigate={setCurrentTab} />;
      case 'companies':
        return <Companies onStartCompanyMock={handleStartMock} />;
      case 'settings':
        return <Settings candidate={candidate} onUpdateCandidate={(updated) => {
          const newScore = calculateMncReadinessScore(updated.categoryScores, updated.branch);
          setCandidate({ ...updated, mncReadinessScore: newScore });
        }} />;
      case 'admin-learning-content':
        if (!isCurrentUserAdmin) {
          return <div className="card" style={{ margin: '2rem', padding: '1.5rem' }}>Admin access requires an assigned administrator role.</div>;
        }
        return (
          <AdminLearningContent
            isAdmin={isCurrentUserAdmin}
            canManageContent={false}
            onNavigateToModule={(subjectObj, moduleTitle) => {
              setSelectedSubject(subjectObj);
              setCurrentTab('subject-detail');
            }}
          />
        );
      default:
        return <Dashboard candidate={candidate} onNavigate={setCurrentTab} onStartMock={handleStartMock} />;
    }
  };

  if (authLoading || (authSession && !sessionVerified)) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)' }}>Checking session...</div>;
  }

  if (currentTab === 'admin-learning-content' && hasVerifiedSession && adminRoleLoading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: 'var(--bg-dark)', color: 'var(--text-main)' }}>Checking administrator access...</div>;
  }

  if (currentTab === 'auth' || (!hasVerifiedSession && !['landing', 'onboarding'].includes(currentTab))) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentTab === 'landing' || currentTab === 'onboarding') {
    return renderContent();
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        candidateScore={candidate.mncReadinessScore} 
        candidate={candidate}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header 
          candidate={candidate} 
          onStartMock={handleStartMock} 
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={setCurrentTab}
          onLogout={handleLogout}
        />

        <main style={{ flex: 1, backgroundColor: 'var(--bg-dark)', overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
