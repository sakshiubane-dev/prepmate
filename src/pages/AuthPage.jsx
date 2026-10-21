import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, Mail, User, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabaseClient.js';

function getAuthDiagnostic(error, sensitiveValues = []) {
  if (!import.meta.env.DEV) return '';
  let message = String(error?.message || 'No message provided');
  for (const value of sensitiveValues) {
    if (value) message = message.split(value).join('[redacted]');
  }
  message = message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted email]')
    .replace(/\b(?:Bearer\s+)?(?:sb_publishable_[A-Za-z0-9_-]+|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)\b/gi, '[redacted credential]')
    .replace(/https?:\/\/\S+/gi, '[redacted URL]')
    .slice(0, 240);
  const code = String(error?.code || 'unknown').replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 80);
  const status = Number.isInteger(error?.status) ? error.status : 'unknown';
  return `Supabase Auth error: code=${code}; HTTP status=${status}; message=${message}`;
}

function DevelopmentAuthDiagnostic({ details }) {
  if (!import.meta.env.DEV || !details) return null;
  return (
    <div role="status" style={{ padding: '0.625rem 0.75rem', marginBottom: '1rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', color: 'var(--text-muted)', fontSize: '0.75rem', overflowWrap: 'anywhere' }}>
      {details}
    </div>
  );
}

function getAuthErrorMessage(error, mode) {
  const code = String(error?.code || '').toLowerCase();
  const message = String(error?.message || '').toLowerCase();

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Please confirm your email address before signing in.';
  }
  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'Email or password is incorrect.';
  }
  if (code === 'user_already_exists' || message.includes('already registered')) {
    return 'An account with this email may already exist. Try signing in instead.';
  }
  if (code === 'email_exists') {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (code === 'signup_disabled' || code === 'email_provider_disabled') {
    return 'Email registration is currently unavailable. Please contact support.';
  }
  if (code === 'email_address_invalid' || message.includes('invalid email')) {
    return 'Enter a valid email address and try again.';
  }
  if (code.includes('rate_limit') || code.includes('too_many_requests') || error?.status === 429) {
    return 'Too many attempts. Wait a few minutes before trying again.';
  }
  if (code === 'weak_password' || message.includes('password should be')) {
    return 'Choose a stronger password and try again.';
  }
  return mode === 'register'
    ? 'We could not create your account. Check your details and try again.'
    : 'We could not sign you in. Check your details and try again.';
}

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [authDiagnostic, setAuthDiagnostic] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features = useMemo(() => [
    'Track MNC interview readiness',
    'Access DSA, CS, and EXTC modules',
    'Save progress across devices',
    'Practice mock interviews and analytics'
  ], []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setAuthDiagnostic('');
    setSuccessMessage('');

    const email = loginForm.email.trim().toLowerCase();
    const password = loginForm.password;

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(getAuthErrorMessage(signInError, 'login'));
        setAuthDiagnostic(getAuthDiagnostic(signInError, [email, password]));
        return;
      }
      onAuthSuccess?.(data.user);
    } catch (caughtError) {
      setError('We could not sign you in. Check your connection and try again.');
      setAuthDiagnostic(getAuthDiagnostic(caughtError, [email, password]));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setAuthDiagnostic('');
    setSuccessMessage('');

    const name = registerForm.name.trim();
    const email = registerForm.email.trim().toLowerCase();
    const password = registerForm.password;
    const confirmPassword = registerForm.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            branch: 'cs',
            target_role: 'Software Engineer'
          }
        }
      });

      if (signUpError) {
        setError(getAuthErrorMessage(signUpError, 'register'));
        setAuthDiagnostic(getAuthDiagnostic(signUpError, [email, name, password, confirmPassword]));
        return;
      }

      if (data.user?.identities?.length === 0) {
        setError('An account with this email may already exist. Try signing in instead.');
        setAuthDiagnostic(import.meta.env.DEV ? 'Supabase returned no identities; this can indicate an existing account under email-enumeration protection.' : '');
        return;
      }

      if (data.session && data.user) {
        setSuccessMessage('Registration successful! Opening your dashboard...');
        onAuthSuccess?.(data.user);
      } else {
        setSuccessMessage('Check your email to confirm your account. After confirming, return here and sign in.');
      }
    } catch (caughtError) {
      setError('We could not create your account. Check your connection and try again.');
      setAuthDiagnostic(getAuthDiagnostic(caughtError, [email, name, password, confirmPassword]));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'radial-gradient(circle at top, rgba(99,102,241,0.18), transparent 38%), #090d16' }}>
      <div style={{ flex: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '520px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/prepmate-logo.png"
                alt=""
                aria-hidden="true"
                style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-dim)' }}>PrepMate</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-main)' }}>Welcome back</div>
            </div>
          </div>

          <div style={{ background: 'rgba(17, 24, 39, 0.82)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.25rem', background: 'rgba(255,255,255,0.02)', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccessMessage(''); }}
                style={{
                  flex: 1,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: mode === 'login' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))' : 'transparent',
                  color: '#fff'
                }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); setSuccessMessage(''); }}
                style={{
                  flex: 1,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: mode === 'register' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))' : 'transparent',
                  color: '#fff'
                }}
              >
                Register
              </button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Email</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <Mail size={16} color="var(--text-dim)" />
                    <input value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} type="email" placeholder="you@example.com" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Password</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <Lock size={16} color="var(--text-dim)" />
                    <input value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} type="password" placeholder="Enter password" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5', borderRadius: '10px', padding: '0.75rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <DevelopmentAuthDiagnostic details={authDiagnostic} />

                {successMessage && (
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)', color: '#86efac', borderRadius: '10px', padding: '0.75rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {successMessage}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.8rem' }}>
                  <span>{isSubmitting ? 'Signing in...' : 'Login to PrepMate'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Full name</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <User size={16} color="var(--text-dim)" />
                    <input value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} type="text" placeholder="John Doe" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Email</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <Mail size={16} color="var(--text-dim)" />
                    <input value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} type="email" placeholder="you@example.com" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Password</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <Lock size={16} color="var(--text-dim)" />
                    <input value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} type="password" placeholder="Create password" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Confirm password</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.8rem 0.9rem' }}>
                    <Lock size={16} color="var(--text-dim)" />
                    <input value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} type="password" placeholder="Confirm password" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }} />
                  </div>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5', borderRadius: '10px', padding: '0.75rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <DevelopmentAuthDiagnostic details={authDiagnostic} />

                {successMessage && (
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)', color: '#86efac', borderRadius: '10px', padding: '0.75rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {successMessage}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.8rem' }}>
                  <UserPlus size={16} />
                  <span>{isSubmitting ? 'Creating account...' : 'Create account'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: '0.8', borderLeft: '1px solid var(--border-color)', background: 'rgba(15, 23, 42, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '420px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <CheckCircle2 size={18} color="var(--accent-emerald)" />
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Your interview engine starts here</span>
          </div>

          <h2 style={{ fontSize: '2.5rem', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Build your profile and begin preparing smarter.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
