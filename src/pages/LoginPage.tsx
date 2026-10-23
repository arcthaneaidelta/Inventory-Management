import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, Lock, CheckCircle2, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useApp();
  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('sarah.mitchell@horizonrehab.com.au');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/app');
  };

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      backgroundColor: '#F8F8F4'
    }}>
      {/* Left Column: Branding, Clinical Vision & Abstract Visual */}
      <div style={{
        padding: '60px 8%',
        backgroundColor: '#244A3D',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: '#8FA99A',
          filter: 'blur(120px)',
          opacity: 0.25,
          pointerEvents: 'none'
        }} />

        {/* Brand Header */}
        <div 
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', position: 'relative', zIndex: 1 }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            backgroundColor: '#8FA99A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 18C8 13 11 8 18 8M8 18C11 15 14 11 18 11M11 18C13 16 15 14 18 14" stroke="#244A3D" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="18" cy="8" r="2" fill="#E9F0EA" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '22px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              RehabEquip <span style={{ color: '#8FA99A', fontWeight: 600 }}>AU</span>
            </h2>
            <div style={{ fontSize: '12px', color: '#D5E2D8', fontWeight: 500 }}>
              Clinical Quote Engine
            </div>
          </div>
        </div>

        {/* Narrative & Visual Concept */}
        <div style={{ position: 'relative', zIndex: 1, margin: 'auto 0', padding: '40px 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'rgba(143, 169, 154, 0.2)',
            borderRadius: '9999px',
            marginBottom: '20px',
            border: '1px solid rgba(143, 169, 154, 0.3)'
          }}>
            <Sparkles size={14} color="#8FA99A" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#D5E2D8' }}>
              ENTERPRISE REHABILITATION PLATFORM
            </span>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: '18px',
            letterSpacing: '-0.02em'
          }}>
            The right equipment. Backed by clinical reasoning.
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#D5E2D8',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            Designed specifically for Australian occupational rehabilitation consultants to bridge the gap between physical restrictions and procurement.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#8FA99A" />
              <span style={{ fontSize: '14px', color: '#E9F0EA' }}>FCE restriction-guided equipment matching</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#8FA99A" />
              <span style={{ fontSize: '14px', color: '#E9F0EA' }}>Automated functional justifications for claims managers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#8FA99A" />
              <span style={{ fontSize: '14px', color: '#E9F0EA' }}>Insurer-ready PDF export in under 5 minutes</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '12px', color: '#8FA99A', position: 'relative', zIndex: 1 }}>
          © 2026 RehabEquip AU · Australian Clinical Technology
        </div>
      </div>

      {/* Right Column: Authentication Card */}
      <div style={{
        padding: '60px 10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 440,
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E7E8E1',
          padding: '36px',
          boxShadow: 'var(--shadow-card)'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E7E8E1', marginBottom: '28px' }}>
            <button
              onClick={() => setTab('signin')}
              style={{
                flex: 1,
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: tab === 'signin' ? 700 : 500,
                color: tab === 'signin' ? '#244A3D' : '#707A73',
                borderBottom: tab === 'signin' ? '2px solid #244A3D' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              style={{
                flex: 1,
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: tab === 'signup' ? 700 : 500,
                color: tab === 'signup' ? '#244A3D' : '#707A73',
                borderBottom: tab === 'signup' ? '2px solid #244A3D' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              Create Account
            </button>
          </div>

          {/* DEMO ACCESS HERO BUTTON */}
          <div style={{
            padding: '16px',
            backgroundColor: '#E9F0EA',
            borderRadius: '14px',
            border: '1.5px solid #244A3D',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <UserCheck size={18} color="#244A3D" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#244A3D' }}>
                Instant Client Demo Access
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#28332D', lineHeight: 1.4, marginBottom: '12px' }}>
              Sign in as <strong>Sarah Mitchell</strong> (Senior Rehabilitation Consultant, Horizon Rehabilitation Group).
            </p>
            <button
              onClick={handleDemoAccess}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '13.5px' }}
            >
              <span>Enter Workspace as Sarah Mitchell</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '20px 0',
            color: '#9DA6A0',
            fontSize: '12px'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E7E8E1' }} />
            <span>or sign in with credentials</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E7E8E1' }} />
          </div>

          {tab === 'signin' && (
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label className="input-label">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                  placeholder="name@providerfirm.com.au"
                />
              </div>

              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="input-label">Password</label>
                  <span 
                    onClick={() => setTab('forgot')}
                    style={{ fontSize: '12px', color: '#244A3D', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-text"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#244A3D', width: 16, height: 16 }}
                />
                <label htmlFor="remember" style={{ fontSize: '13px', color: '#707A73', cursor: 'pointer' }}>
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                Sign In to Workspace
              </button>
            </form>
          )}

          {tab === 'signup' && (
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-text"
                  placeholder="e.g. Dr. Lachlan Vance"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Provider Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                  placeholder="name@rehabgroup.com.au"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Create Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-text"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                Create Rehabilitation Workspace
              </button>
            </form>
          )}

          {tab === 'forgot' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13px', color: '#707A73', lineHeight: 1.5 }}>
                Enter your registered provider email address to receive a secure password reset link.
              </p>
              <div className="input-group">
                <label className="input-label">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                />
              </div>
              <button
                onClick={() => {
                  alert('Password reset link simulated sent to ' + email);
                  setTab('signin');
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send Password Reset Instructions
              </button>
              <button
                onClick={() => setTab('signin')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
