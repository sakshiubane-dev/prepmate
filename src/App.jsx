import React, { useState } from 'react';
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
import MockSession from './pages/Interviews/MockSession';
import FeedbackReport from './pages/Interviews/FeedbackReport';
import ResumeBuilder from './pages/Resume/ResumeBuilder';
import AtsAnalyzer from './pages/Resume/AtsAnalyzer';
import JobMatcher from './pages/Resume/JobMatcher';
import Analytics from './pages/Analytics';
import Roadmap from './pages/Roadmap';
import Companies from './pages/Companies';
import Settings from './pages/Settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [candidate, setCandidate] = useState(INITIAL_CANDIDATE);
  const [lastSessionData, setLastSessionData] = useState(null);

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

    const newMncScore = calculateMncReadinessScore(updatedCategoryScores);

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
          feedback: "Good response depth. Suggested reviewing database caching layer."
        },
        ...prev.recentInterviews
      ]
    }));

    setCurrentTab('feedback-report');
  };

  const handleCompleteOnboarding = (onboardingData) => {
    setCandidate(prev => ({
      ...prev,
      targetRole: onboardingData.targetRole,
      experienceLevel: onboardingData.experienceLevel,
      primaryStack: onboardingData.stack,
      targetCompanies: onboardingData.targetCompanies,
      timeline: onboardingData.timeline
    }));
    setCurrentTab('dashboard');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'landing':
        return <Landing onStart={() => setCurrentTab('onboarding')} onExplore={() => setCurrentTab('dashboard')} />;
      case 'onboarding':
        return <Onboarding onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return <Dashboard candidate={candidate} onNavigate={setCurrentTab} onStartMock={handleStartMock} />;
      case 'prepare-aptitude':
        return <Aptitude />;
      case 'prepare-dsa':
        return <DSA onCompleteProblem={() => {}} />;
      case 'prepare-corecs':
        return <CoreCS />;
      case 'prepare-systemdesign':
        return <SystemDesign />;
      case 'interviews-technical':
      case 'interviews-hr':
      case 'interviews-fullmock':
      case 'interviews-mock':
        return <MockSession interviewType={currentTab} onFinishInterview={handleFinishInterview} />;
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
        return <Roadmap onNavigate={setCurrentTab} />;
      case 'companies':
        return <Companies onStartCompanyMock={handleStartMock} />;
      case 'settings':
        return <Settings candidate={candidate} />;
      default:
        return <Dashboard candidate={candidate} onNavigate={setCurrentTab} onStartMock={handleStartMock} />;
    }
  };

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
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header 
          candidate={candidate} 
          onStartMock={handleStartMock} 
        />

        <main style={{ flex: 1, backgroundColor: 'var(--bg-dark)', overflowY: 'auto' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
