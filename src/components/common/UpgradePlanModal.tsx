import React from 'react';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({ isOpen, onClose }) => {
  const { workspaceConfig, upgradePlan } = useApp();

  if (!isOpen) return null;

  const plans = [
    {
      id: 'starter' as const,
      name: 'Starter Plan',
      price: '$189',
      billing: 'AUD / month + GST',
      reports: 50,
      seats: 3,
      desc: 'Ideal for solo occupational therapists and boutique rehabilitation practices.',
      features: [
        '50 Insurer-ready reports / month',
        '3 Consultant team seats',
        '7 Demonstration supplier feeds',
        'AI Functional justification engine',
        'Standard PDF export'
      ]
    },
    {
      id: 'pro' as const,
      name: 'Professional',
      badge: 'Most Popular',
      price: '$480',
      billing: 'AUD / month + GST',
      reports: 250,
      seats: 10,
      desc: 'Engineered for growing rehabilitation provider firms managing volume FCE caseloads.',
      features: [
        '250 Insurer-ready reports / month',
        '10 Consultant team seats',
        'Priority quote generation simulation',
        'Multi-framework compliance (Comcare, icare, WorkSafe)',
        'Custom report branding & letterhead',
        'Audit-ready documentation export'
      ]
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise Network',
      price: '$1,190',
      billing: 'AUD / month + GST',
      reports: 1000,
      seats: 50,
      desc: 'For national occupational rehabilitation networks with centralized procurement.',
      features: [
        '1,000+ Reports / month',
        '50+ Team seats with role hierarchy',
        'Dedicated procurement API adapters',
        'Bespoke insurer matrix rules',
        'Custom SSO & audit log export'
      ]
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 880, padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-forest">Simulated Subscription Engine</span>
              <span style={{ fontSize: '12px', color: '#707A73' }}>No credit card required for demo</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
              Choose a Rehabilitation Workspace Tier
            </h2>
            <p style={{ fontSize: '13.5px', color: '#707A73' }}>
              Scale report allowances and consultant seats across your provider firm.
            </p>
          </div>
          <button onClick={onClose} style={{ color: '#707A73', padding: '6px', borderRadius: '8px' }}>
            <X size={20} />
          </button>
        </div>

        {/* 3 Tier Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {plans.map((p) => {
            const isCurrent = workspaceConfig.currentPlanId === p.id;
            return (
              <div
                key={p.id}
                style={{
                  borderRadius: '16px',
                  border: isCurrent ? '2px solid #244A3D' : '1px solid #E7E8E1',
                  backgroundColor: isCurrent ? '#FAFBF9' : '#FFFFFF',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: isCurrent ? '0 8px 24px rgba(36, 74, 61, 0.08)' : 'none'
                }}
              >
                {p.badge && (
                  <div style={{
                    position: 'absolute',
                    top: -11,
                    right: 18,
                    backgroundColor: '#244A3D',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    letterSpacing: '0.02em'
                  }}>
                    {p.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#28332D', marginBottom: '4px' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#707A73', minHeight: '36px', lineHeight: 1.4, marginBottom: '16px' }}>
                    {p.desc}
                  </p>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 800, color: '#244A3D' }}>{p.price}</span>
                    <span style={{ fontSize: '12px', color: '#707A73', marginLeft: '6px' }}>{p.billing}</span>
                  </div>

                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#F8F8F4',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '12.5px',
                    color: '#28332D',
                    fontWeight: 600
                  }}>
                    {p.reports} Reports · {p.seats} Consultant Seats
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {p.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#28332D' }}>
                        <Check size={14} color="#244A3D" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  disabled={isCurrent}
                  onClick={() => {
                    upgradePlan(p.id);
                    onClose();
                  }}
                  className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
                >
                  {isCurrent ? 'Current Active Tier' : `Switch to ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{
          padding: '12px 16px',
          backgroundColor: '#F8F8F4',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          color: '#707A73'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#244A3D" />
            <span>Australian Tax Compliant: GST 10% calculated automatically on generated quotes & subscriptions.</span>
          </div>
          <span style={{ fontWeight: 600, color: '#244A3D' }}>Simulated Instant Activation</span>
        </div>
      </div>
    </div>
  );
};
