import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  FileSpreadsheet, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Lock,
  Eye,
  Sliders,
  Check,
  Building2,
  PackageCheck,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedQuoteTab, setSelectedQuoteTab] = useState<'value' | 'rapid' | 'premium'>('rapid');
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient canvas background animation (lightweight, 60fps, ergonomic movement waves)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;
    const render = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Subtle sage aura 1
      const grad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(t) * 40,
        height * 0.35 + Math.cos(t * 0.8) * 30,
        20,
        width * 0.25,
        height * 0.35,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(233, 240, 234, 0.7)');
      grad1.addColorStop(1, 'rgba(248, 248, 244, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Subtle muted eucalyptus aura 2
      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(t * 0.7) * 40,
        height * 0.55 + Math.sin(t * 0.9) * 30,
        30,
        width * 0.75,
        height * 0.55,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(213, 226, 216, 0.45)');
      grad2.addColorStop(1, 'rgba(248, 248, 244, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStartDemo = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <div style={{ backgroundColor: '#F8F8F4', minHeight: '100vh', position: 'relative' }}>
      {/* Ambient Motion Canvas */}
      <canvas ref={canvasRef} className="ambient-hero-canvas" />

      {/* FLOATING TOP NAVIGATION */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 76,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(248, 248, 244, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid #E7E8E1' : '1px solid transparent'
      }}>
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            backgroundColor: '#244A3D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(36, 74, 61, 0.2)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 18C8 13 11 8 18 8M8 18C11 15 14 11 18 11M11 18C13 16 15 14 18 14" stroke="#8FA99A" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="18" cy="8" r="1.8" fill="#E9F0EA" />
            </svg>
          </div>
          <div>
            <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '20px', color: '#244A3D', letterSpacing: '-0.02em' }}>
              RehabEquip <span style={{ color: '#8FA99A', fontWeight: 600 }}>AU</span>
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#how-it-works" style={{ fontSize: '14px', fontWeight: 600, color: '#28332D' }}>How It Works</a>
          <a href="#quotes" style={{ fontSize: '14px', fontWeight: 600, color: '#28332D' }}>Three-Tier Engine</a>
          <a href="#clinical-intelligence" style={{ fontSize: '14px', fontWeight: 600, color: '#28332D' }}>Clinical Reasoning</a>
          <a href="#reporting" style={{ fontSize: '14px', fontWeight: 600, color: '#28332D' }}>Insurer Reports</a>
          <a href="#privacy" style={{ fontSize: '14px', fontWeight: 600, color: '#28332D' }}>Privacy Architecture</a>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '13.5px' }}
          >
            Sign In
          </button>
          <button
            onClick={handleStartDemo}
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '13.5px' }}
          >
            <span>Launch Interactive Demo</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        padding: '120px 5% 60px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: '48px',
          alignItems: 'center',
          maxWidth: 1360,
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Left Column: Narrative Headline & CTAs */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: '#E9F0EA',
              borderRadius: '9999px',
              marginBottom: '24px',
              border: '1px solid #D5E2D8'
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#244A3D' }} />
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#244A3D', letterSpacing: '0.02em' }}>
                BUILT FOR AUSTRALIAN OCCUPATIONAL REHABILITATION
              </span>
            </div>

            <h1 style={{
              fontSize: '48px',
              fontWeight: 800,
              color: '#28332D',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}>
              Equipment recommendations that <span style={{ color: '#244A3D', borderBottom: '3px solid #8FA99A' }}>understand</span> the restrictions.
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#707A73',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '560px'
            }}>
              Turn functional capacity evaluations into clinically informed equipment recommendations, intelligent quotes across Australian suppliers, and insurer-ready documentation.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <button
                onClick={handleStartDemo}
                className="btn btn-primary btn-lg"
                style={{ fontSize: '16px', padding: '14px 28px' }}
              >
                <span>Explore the Platform</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#how-it-works"
                className="btn btn-outline btn-lg"
                style={{ fontSize: '15px' }}
              >
                See How It Works
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              paddingTop: '24px',
              borderTop: '1px solid #E7E8E1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#244A3D" />
                <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>FCE Restriction Driven</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#244A3D" />
                <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>3 Quote Tiers in Seconds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#244A3D" />
                <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>icare & Comcare Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Product Preview */}
          <div 
            onClick={handleStartDemo}
            style={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            title="Click to launch interactive workspace"
          >
            {/* Ambient shadow backplate */}
            <div style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(143, 169, 154, 0.25), rgba(36, 74, 61, 0.15))',
              filter: 'blur(24px)',
              zIndex: 0
            }} />

            {/* Main Interactive Preview Card */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E7E8E1',
              boxShadow: '0 24px 60px rgba(36, 74, 61, 0.1)',
              padding: '28px',
              animation: 'floatSlow 7s ease-in-out infinite'
            }}>
              {/* Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: '#244A3D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={16} color="#E9F0EA" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#28332D' }}>
                      Assessment RE-2026-1043
                    </div>
                    <div style={{ fontSize: '11px', color: '#707A73' }}>
                      Worker WRK-0084 · Administrative Role
                    </div>
                  </div>
                </div>

                <span className="badge badge-forest">
                  Live Match Engine
                </span>
              </div>

              {/* Restriction Chips */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px',
                padding: '12px',
                backgroundColor: '#FAF9F5',
                borderRadius: '12px',
                border: '1px solid #E7E8E1'
              }}>
                <span className="badge badge-sand" style={{ fontSize: '11px' }}>Sitting Max 30m</span>
                <span className="badge badge-sand" style={{ fontSize: '11px' }}>Standing Max 15m</span>
                <span className="badge badge-sand" style={{ fontSize: '11px' }}>Lifting Occasional 10kg</span>
                <span className="badge badge-sand" style={{ fontSize: '11px' }}>Reduced Grip Force</span>
              </div>

              {/* Three Mini Quote Cards Stack */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  padding: '12px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#F1EBDD',
                  border: '1px solid #E4DCCB',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#796135' }}>VALUE</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#28332D', marginTop: '2px' }}>$1,485</div>
                  <div style={{ fontSize: '10px', color: '#707A73' }}>Essential fit</div>
                </div>

                <div style={{
                  padding: '12px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#E9F0EA',
                  border: '1.5px solid #244A3D',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(36, 74, 61, 0.08)'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#244A3D' }}>RAPID</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#244A3D', marginTop: '2px' }}>$1,840</div>
                  <div style={{ fontSize: '10px', color: '#244A3D', fontWeight: 600 }}>24h Dispatch</div>
                </div>

                <div style={{
                  padding: '12px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#FAF9F5',
                  border: '1px solid #E7E8E1',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#707A73' }}>COMMERCIAL</div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#28332D', marginTop: '2px' }}>$2,695</div>
                  <div style={{ fontSize: '10px', color: '#707A73' }}>10-Yr Warranty</div>
                </div>
              </div>

              {/* Sample Product Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #E7E8E1',
                backgroundColor: '#FFFFFF',
                marginBottom: '16px'
              }}>
                <img
                  src="/images/chair.jpg"
                  alt="ErgoFlex Chair"
                  style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '8px', backgroundColor: '#F8F8F4' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#28332D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    ErgoFlex Pro Task Chair
                  </div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>
                    Ergonomic Office · In Stock Sydney Hub
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#244A3D' }}>$685 AUD</div>
                  <div style={{ fontSize: '10px', color: '#8FA99A' }}>AFRDI Level 6</div>
                </div>
              </div>

              {/* Clinical Justification Snippet */}
              <div style={{
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#F8F8F4',
                fontSize: '11.5px',
                color: '#707A73',
                lineHeight: 1.4,
                borderLeft: '3px solid #244A3D'
              }}>
                <span style={{ fontWeight: 600, color: '#28332D' }}>Clinical reasoning: </span>
                Synchronised seat slide and dynamic lumbar relieve ischial pressure during 30-min sitting tolerances.
              </div>

              {/* Floating Action Trigger Prompt */}
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#244A3D'
              }}>
                <Play size={13} fill="#244A3D" />
                <span>Click to explore live interactive consultant workspace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PROBLEM */}
      <section style={{ padding: '100px 5%', backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E8E1' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-sand" style={{ marginBottom: '12px' }}>THE PROCUREMENT BOTTLENECK</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Equipment sourcing shouldn't take hours.
            </h2>
            <p style={{ fontSize: '16px', color: '#707A73', maxWidth: '640px', margin: '0 auto' }}>
              Occupational rehabilitation consultants lose up to 4 hours per claim compiling quotes, verifying distributor stock, and drafting insurer justifications from scratch.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: 42, height: 42, borderRadius: '12px', backgroundColor: '#FBEFEE', color: '#B76D66', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
                Fragmented Supplier Silos
              </h3>
              <p style={{ fontSize: '14px', color: '#707A73', lineHeight: 1.5 }}>
                Switching between Officeworks, Harvey Norman Commercial, and niche ergonomic boutiques to locate compatible stock and compare shipping times.
              </p>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: 42, height: 42, borderRadius: '12px', backgroundColor: '#FDF7EC', color: '#C49B55', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Clock size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
                Repetitive Justification Writing
              </h3>
              <p style={{ fontSize: '14px', color: '#707A73', lineHeight: 1.5 }}>
                Translating physical FCE restrictions into formal, defensible clinical paragraphs for each item to satisfy claims manager scrutiny.
              </p>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: 42, height: 42, borderRadius: '12px', backgroundColor: '#E9F0EA', color: '#244A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <FileSpreadsheet size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
                Inconsistent Quote Preparation
              </h3>
              <p style={{ fontSize: '14px', color: '#707A73', lineHeight: 1.5 }}>
                Manually recalculating GST, assembling multiple quote tiers (Value vs. Commercial), and formatting audit tables by hand in Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE SOLUTION / WORKFLOW */}
      <section id="how-it-works" style={{ padding: '100px 5%', backgroundColor: '#F8F8F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-forest" style={{ marginBottom: '12px' }}>UNIFIED CLINICAL WORKSPACE</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              One workflow. Three intelligent quote options.
            </h2>
            <p style={{ fontSize: '16px', color: '#707A73', maxWidth: '640px', margin: '0 auto' }}>
              A continuous, compliant pipeline engineered specifically for Australian rehabilitation consultants.
            </p>
          </div>

          {/* 5-Step Visual Pipeline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            position: 'relative'
          }}>
            {[
              { step: '01', title: 'FCE Restrictions', desc: 'Enter lifting, sitting, and upper limb limits in a structured 5-step wizard.' },
              { step: '02', title: 'Catalogue Match', desc: 'Algorithm cross-references AFRDI ratings, weight capacities, and specs.' },
              { step: '03', title: 'Quote Packages', desc: 'Instantly assembles Value, Rapid Fulfilment, and Premium options.' },
              { step: '04', title: 'AI Justifications', desc: 'Generates defensible clinical rationale tied directly to documented restrictions.' },
              { step: '05', title: 'Insurer Export', desc: 'Download audit-ready PDF formatted for Comcare, icare, and WorkSafe.' }
            ].map((st, i) => (
              <div
                key={st.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px 18px',
                  border: '1px solid #E7E8E1',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#244A3D',
                    backgroundColor: '#E9F0EA',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '14px'
                  }}>
                    {st.step}
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
                    {st.title}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#707A73', lineHeight: 1.5 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THREE QUOTE PACKAGES SHOWCASE */}
      <section id="quotes" style={{ padding: '100px 5%', backgroundColor: '#FFFFFF', borderTop: '1px solid #E7E8E1' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-sage" style={{ marginBottom: '12px' }}>DIFFERENTIATED PROCUREMENT</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Three tailored packages for every assessment.
            </h2>
            <p style={{ fontSize: '16px', color: '#707A73', maxWidth: '640px', margin: '0 auto' }}>
              Satisfy employer budgets, urgent return-to-work deadlines, and heavy-duty commercial longevity requirements.
            </p>
          </div>

          {/* 3 Tier Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Value Card */}
            <div style={{
              borderRadius: '20px',
              border: '1px solid #E4DCCB',
              backgroundColor: '#FAF9F5',
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span className="badge badge-sand" style={{ marginBottom: '14px' }}>Lowest Total Cost</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>Value</h3>
                <p style={{ fontSize: '13.5px', color: '#707A73', marginBottom: '20px', lineHeight: 1.5 }}>
                  Cost-conscious equipment selections meeting essential functional restrictions without extraneous accessories.
                </p>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#244A3D', marginBottom: '16px' }}>
                  $1,485 <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>AUD incl. GST</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>Horizon 3-Lever Ergonomic Chair ($395)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>SwiftRise Dual Motor Desk ($620)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>Glide Single Gas Monitor Mount ($145)</span>
                  </div>
                </div>
              </div>
              <button onClick={handleStartDemo} className="btn btn-outline" style={{ width: '100%' }}>
                Inspect Value Quote
              </button>
            </div>

            {/* Rapid Fulfilment Card (Hero Highlight) */}
            <div style={{
              borderRadius: '20px',
              border: '2px solid #244A3D',
              backgroundColor: '#FAFBF9',
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 40px rgba(36, 74, 61, 0.08)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: -12,
                right: 24,
                backgroundColor: '#244A3D',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: '6px'
              }}>
                FAST RETURN-TO-WORK
              </div>
              <div>
                <span className="badge badge-forest" style={{ marginBottom: '14px' }}>Local Stock Priority</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#244A3D', marginBottom: '6px' }}>Rapid Fulfilment</h3>
                <p style={{ fontSize: '13.5px', color: '#707A73', marginBottom: '20px', lineHeight: 1.5 }}>
                  Equipment prioritised for same-day metropolitan inventory dispatch and expedited rehabilitation delivery.
                </p>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#244A3D', marginBottom: '16px' }}>
                  $1,840 <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>AUD incl. GST</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>ErgoFlex Pro Task Chair (Alexandria NSW Hub)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>SwiftRise Dual Motor Desk (In Stock Officeworks)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>Precision Dual Articulating Monitor Arm</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>AeroPosture Vertical Wireless Mouse</span>
                  </div>
                </div>
              </div>
              <button onClick={handleStartDemo} className="btn btn-primary" style={{ width: '100%' }}>
                Inspect Rapid Package
              </button>
            </div>

            {/* Premium Commercial Card */}
            <div style={{
              borderRadius: '20px',
              border: '1px solid #D5E2D8',
              backgroundColor: '#FFFFFF',
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span className="badge badge-sage" style={{ marginBottom: '14px' }}>10-Year Warranty</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>Premium Commercial</h3>
                <p style={{ fontSize: '13.5px', color: '#707A73', marginBottom: '20px', lineHeight: 1.5 }}>
                  AFRDI Level 6 certified commercial furniture with maximum adjustability ratings for complex chronic pathologies.
                </p>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#244A3D', marginBottom: '16px' }}>
                  $2,695 <span style={{ fontSize: '13px', color: '#707A73', fontWeight: 500 }}>AUD incl. GST</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>ErgoFlex Pro with Seat Slide & 3D Arms ($685)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>Align Commercial Sit-Stand Desk 1500mm ($890)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>Precision Gas Dual Arm & Split Wave Keyboard</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#28332D' }}>
                    <Check size={16} color="#244A3D" />
                    <span>ActiveRelief Dynamic Footrest Support</span>
                  </div>
                </div>
              </div>
              <button onClick={handleStartDemo} className="btn btn-outline" style={{ width: '100%' }}>
                Inspect Commercial Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CLINICAL INTELLIGENCE & PRIVACY */}
      <section id="privacy" style={{ padding: '100px 5%', backgroundColor: '#F8F8F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-forest" style={{ marginBottom: '14px' }}>PRIVACY-BY-DESIGN</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                Designed to protect injured worker information.
              </h2>
              <p style={{ fontSize: '16px', color: '#707A73', lineHeight: 1.6, marginBottom: '24px' }}>
                Identifying worker details, names, and claim identifiers remain completely isolated within browser-side state. Only anonymous biomechanical metrics are evaluated by the AI justification engine.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E9F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Lock size={15} color="#244A3D" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#28332D' }}>Zero PII Transmission</h4>
                    <p style={{ fontSize: '13px', color: '#707A73' }}>
                      Worker names and claim references never leave the client application.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E9F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={15} color="#244A3D" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#28332D' }}>Australian Privacy Principles (APP) Ready</h4>
                    <p style={{ fontSize: '13px', color: '#707A73' }}>
                      Architecture adheres to strict health data governance frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Anonymous AI Payload Simulator Preview */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E7E8E1',
              padding: '24px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#244A3D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Simulated AI Engine Payload (Sanitized)
                </span>
                <span className="badge badge-sage">No PII Included</span>
              </div>

              <pre style={{
                backgroundColor: '#28332D',
                color: '#E9F0EA',
                padding: '18px',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                lineHeight: 1.5
              }}>
{`{
  "sittingToleranceMinutes": 30,
  "standingToleranceMinutes": 15,
  "liftingOccasionalKg": 10,
  "carryingOccasionalKg": 8,
  "gripStrength": "Moderately Reduced",
  "posturalRestrictions": [
    "Avoid Sustained Static Postures",
    "Avoid Prolonged Forward Flexion"
  ],
  "workerPII": "REDACTED_LOCAL_ONLY"
}`}
              </pre>

              <div style={{ marginTop: '14px', fontSize: '11.5px', color: '#707A73', fontStyle: 'italic' }}>
                Identifying metadata is assembled into the final PDF document entirely within the consultant's browser.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section style={{
        padding: '100px 5%',
        backgroundColor: '#244A3D',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Make equipment sourcing work smarter.
          </h2>
          <p style={{ fontSize: '17px', color: '#D5E2D8', lineHeight: 1.6, marginBottom: '36px' }}>
            Experience a more intelligent way to turn functional capacity restrictions into equipment solutions, live quotes, and insurer-ready reports.
          </p>

          <button
            onClick={handleStartDemo}
            className="btn btn-sand btn-lg"
            style={{ fontSize: '16px', padding: '16px 36px', fontWeight: 700 }}
          >
            <span>Launch Interactive Demo</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '60px 5% 40px',
        backgroundColor: '#1C3B31',
        color: '#8FA99A',
        borderTop: '1px solid rgba(143, 169, 154, 0.2)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                backgroundColor: '#8FA99A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18C8 13 11 8 18 8M8 18C11 15 14 11 18 11M11 18C13 16 15 14 18 14" stroke="#244A3D" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '18px', color: '#FFFFFF' }}>
                RehabEquip AU
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#D5E2D8', maxWidth: '320px', lineHeight: 1.5 }}>
              The right equipment. Backed by clinical reasoning. Intelligent equipment sourcing and quote aggregation for Australian rehabilitation providers.
            </p>
          </div>

          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Platform
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <a href="#how-it-works" style={{ color: '#D5E2D8' }}>FCE Wizard</a>
              <a href="#quotes" style={{ color: '#D5E2D8' }}>Three-Tier Quotes</a>
              <a href="#clinical-intelligence" style={{ color: '#D5E2D8' }}>AI Justifications</a>
              <a href="#reporting" style={{ color: '#D5E2D8' }}>Insurer PDF Export</a>
            </div>
          </div>

          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Frameworks
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#D5E2D8' }}>
              <span>Comcare Scheme</span>
              <span>icare NSW</span>
              <span>WorkSafe Victoria</span>
              <span>WorkCover Queensland</span>
            </div>
          </div>

          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Demonstration Notice
            </h5>
            <p style={{ fontSize: '12px', color: '#8FA99A', lineHeight: 1.5 }}>
              This prototype contains simulated supplier feeds and sample pricing for demonstration purposes only.
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(143, 169, 154, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#8FA99A'
        }}>
          <div>
            © 2026 RehabEquip AU. All rights reserved. Australian Health Innovation.
          </div>
          <div>
            Simulated demonstration environment · Sydney, New South Wales
          </div>
        </div>
      </footer>
    </div>
  );
};
