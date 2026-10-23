import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPage: React.FC = () => {
  const { currentAssessment, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  // Generate the clean, sanitized AI Payload Preview (strictly no PII)
  const sanitizedPayload = {
    clinicalAssessmentRef: currentAssessment.reference,
    workRoleCategory: currentAssessment.workRole,
    workEnvironment: currentAssessment.workEnvironment,
    biomechanicalRestrictions: {
      materialHandling: {
        occasionalLiftingKg: currentAssessment.materialHandling.occasionalLiftingKg,
        frequentLiftingKg: currentAssessment.materialHandling.frequentLiftingKg,
        pushForceNewtons: currentAssessment.materialHandling.pushForceN,
        pullForceNewtons: currentAssessment.materialHandling.pullForceN
      },
      posturalTolerances: {
        sittingMinutes: currentAssessment.posturalTolerances.sittingMinutes,
        standingMinutes: currentAssessment.posturalTolerances.standingMinutes,
        documentedContraindications: currentAssessment.posturalTolerances.restrictions
      },
      distalLimbConstraints: {
        gripStrengthTier: currentAssessment.upperLimbConstraints.gripStrength,
        specificJointLimits: currentAssessment.upperLimbConstraints.constraints
      }
    },
    privacyGovernance: {
      workerPersonalName: '[EXCLUDED_LOCAL_CLIENT_STATE]',
      dateOfBirth: '[EXCLUDED_NOT_COLLECTED]',
      insurerClaimNumber: '[EXCLUDED_LOCAL_CLIENT_STATE]',
      australianPrivacyPrinciple11: 'ENFORCED'
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(sanitizedPayload, null, 2));
    setCopied(true);
    showToast('Sanitized AI payload copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-forest">Security & Compliance</span>
          <span style={{ fontSize: '13px', color: '#707A73' }}>• Australian Privacy Principles</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
          Privacy-by-Design Architecture
        </h1>
        <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
          How RehabEquip AU isolates worker identity and generates clinically defensible justifications without exposing PII.
        </p>
      </div>

      {/* SIX-STAGE VISUAL DATA ISOLATION PIPELINE */}
      <div className="card card-large" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '8px' }}>
          End-to-End Client Isolation Pipeline
        </h2>
        <p style={{ fontSize: '13px', color: '#707A73', marginBottom: '28px' }}>
          Trace how functional capacity metrics travel through the decision-support engine.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px'
        }}>
          {[
            { step: '1', title: 'Consultant Input', desc: 'Enters FCE tolerances and worker reference in browser.', badge: 'Local Browser' },
            { step: '2', title: 'PII Isolation', desc: 'Identifying details are stored in client memory only.', badge: 'Zero Cloud PII' },
            { step: '3', title: 'Metric Extraction', desc: 'Biomechanics stripped into anonymous numerical payload.', badge: 'Sanitization' },
            { step: '4', title: 'AI Justification', desc: 'Clinical LLM evaluates ergonomics against restrictions.', badge: 'Audited Model' },
            { step: '5', title: 'Quote Synthesis', desc: 'Matches equipment catalogues across retailer feeds.', badge: 'Procurement' },
            { step: '6', title: 'Local Assembly', desc: 'PDF generated in browser with worker ref reassembled.', badge: 'Client Download' },
          ].map(p => (
            <div
              key={p.step}
              style={{
                backgroundColor: '#FAF9F5',
                borderRadius: '14px',
                padding: '18px 14px',
                border: '1px solid #E7E8E1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span className="badge badge-forest" style={{ fontSize: '10.5px', marginBottom: '8px' }}>
                  {p.badge}
                </span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#244A3D', marginBottom: '6px' }}>
                  Step {p.step}
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#28332D', marginBottom: '6px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '11.5px', color: '#707A73', lineHeight: 1.4 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SANITIZED PAYLOAD INSPECTOR & SECURITY STATS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left: Sanitized AI Payload Preview */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D' }}>
                Simulated AI Engine Payload Inspector
              </h3>
              <p style={{ fontSize: '12px', color: '#707A73' }}>
                Verified snapshot transmitted to the clinical reasoning model
              </p>
            </div>
            <button
              onClick={handleCopyJSON}
              className="btn btn-outline btn-sm"
            >
              {copied ? <Check size={14} color="#244A3D" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre style={{
            backgroundColor: '#28332D',
            color: '#E9F0EA',
            padding: '20px',
            borderRadius: '12px',
            fontSize: '12px',
            fontFamily: 'monospace',
            overflowX: 'auto',
            maxHeight: '440px',
            lineHeight: 1.5
          }}>
            {JSON.stringify(sanitizedPayload, null, 2)}
          </pre>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '14px',
            fontSize: '11.5px',
            color: '#244A3D',
            fontWeight: 600
          }}>
            <CheckCircle2 size={14} />
            <span>Demonstrates that no candidate names or claim IDs are transmitted outside the user browser.</span>
          </div>
        </div>

        {/* Right: Australian Hosting & Health Governance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D', marginBottom: '14px' }}>
              Australian Hosting & Compliance Pillars
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Server size={18} color="#244A3D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
                    Sovereign Australian Cloud Infrastructure
                  </div>
                  <div style={{ fontSize: '12px', color: '#707A73' }}>
                    Production services deployed in Sydney (ap-southeast-2) with encrypted multi-region failover.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Lock size={18} color="#244A3D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
                    AES-256 & TLS 1.3 Encryption
                  </div>
                  <div style={{ fontSize: '12px', color: '#707A73' }}>
                    All local state cache and future API transmissions protected with enterprise cryptographic standards.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <ShieldCheck size={18} color="#244A3D" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
                    Statutory Audit Readiness
                  </div>
                  <div style={{ fontSize: '12px', color: '#707A73' }}>
                    Reports include verification timestamps and disclaimer clauses protecting clinical consultants.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#FAF9F5',
            borderRadius: '16px',
            border: '1px solid #E7E8E1'
          }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D', marginBottom: '6px' }}>
              Demonstration Environment Disclaimer
            </h4>
            <p style={{ fontSize: '12px', color: '#707A73', lineHeight: 1.5 }}>
              This prototype demonstrates the proposed security architecture. Production deployment will be verified against formal IRAP, ISO 27001, and SOC 2 Type II assessment frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
