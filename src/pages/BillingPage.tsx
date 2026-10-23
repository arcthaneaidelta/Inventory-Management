import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  FileSpreadsheet, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UpgradePlanModal } from '../components/common/UpgradePlanModal';

export const BillingPage: React.FC = () => {
  const { workspaceConfig, simulateAdditionalUsage, showToast } = useApp();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const usagePercent = Math.min(100, (workspaceConfig.reportsUsed / workspaceConfig.reportsLimit) * 100);
  const remainingReports = Math.max(0, workspaceConfig.reportsLimit - workspaceConfig.reportsUsed);

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Subscription & Caseload Volume</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              • {workspaceConfig.orgName}
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Plan Allocation & Usage Tracking
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Monitor monthly report generations, consultant seats, and simulated subscription tiers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => simulateAdditionalUsage(10)}
            className="btn btn-outline"
            title="Simulate generating 10 reports"
          >
            <Plus size={16} />
            <span>Simulate +10 Reports</span>
          </button>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="btn btn-primary"
          >
            <Sparkles size={16} />
            <span>Upgrade Workspace Plan</span>
          </button>
        </div>
      </div>

      {/* ACTIVE PLAN & USAGE HERO CARD */}
      <div className="card card-large" style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '36px',
          alignItems: 'center'
        }}>
          {/* Left: Active Tier Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-forest" style={{ textTransform: 'uppercase' }}>
                {workspaceConfig.currentPlanId} Subscription Tier
              </span>
              <span className="badge badge-neutral">Active Billing Cycle</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#28332D', marginBottom: '8px' }}>
              {workspaceConfig.currentPlanId === 'starter' ? 'Starter Provider Practice' : workspaceConfig.currentPlanId === 'pro' ? 'Professional Rehabilitation Firm' : 'Enterprise Network'}
            </h2>
            <p style={{ fontSize: '14px', color: '#707A73', lineHeight: 1.5, marginBottom: '20px' }}>
              Includes {workspaceConfig.reportsLimit} monthly clinical quote evaluations, {workspaceConfig.seatsLimit} consultant seats, multi-framework compliance, and automated PDF export.
            </p>

            <div style={{ display: 'flex', gap: '18px', fontSize: '13px', color: '#28332D' }}>
              <div>
                <span style={{ color: '#707A73' }}>Next Renewal: </span>
                <strong>1 Nov 2026</strong>
              </div>
              <div>
                <span style={{ color: '#707A73' }}>Payment Method: </span>
                <strong>Direct Corporate Debit (AUD)</strong>
              </div>
            </div>
          </div>

          {/* Right: Interactive Usage Meter */}
          <div style={{
            backgroundColor: '#FAF9F5',
            borderRadius: '16px',
            border: '1px solid #E7E8E1',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
                Monthly Report Volume
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#244A3D' }}>
                {workspaceConfig.reportsUsed} of {workspaceConfig.reportsLimit} used
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div style={{
              height: '10px',
              backgroundColor: '#E7E8E1',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '14px'
            }}>
              <div style={{
                height: '100%',
                width: `${usagePercent}%`,
                backgroundColor: usagePercent > 85 ? '#B76D66' : '#244A3D',
                borderRadius: '9999px',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#707A73' }}>
              <span>{remainingReports} reports remaining</span>
              <span>Resets on 1st of month</span>
            </div>
          </div>
        </div>
      </div>

      {/* PLAN COMPARISON CARDS */}
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '16px' }}>
        Available Rehabilitation Tiers
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Starter */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          border: workspaceConfig.currentPlanId === 'starter' ? '2px solid #244A3D' : '1px solid #E7E8E1',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-neutral" style={{ marginBottom: '12px' }}>Boutique Practices</span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>Starter</h3>
            <p style={{ fontSize: '12.5px', color: '#707A73', marginBottom: '16px' }}>
              For solo consultants needing essential matching and PDF exports.
            </p>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginBottom: '14px' }}>
              $189 <span style={{ fontSize: '12px', color: '#707A73', fontWeight: 500 }}>AUD / mo + GST</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#28332D' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>50 Reports / month</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>3 Consultant seats</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>Basic PDF exports</span>
              </div>
            </div>
          </div>
          <button
            disabled={workspaceConfig.currentPlanId === 'starter'}
            onClick={() => setShowUpgradeModal(true)}
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '24px' }}
          >
            {workspaceConfig.currentPlanId === 'starter' ? 'Active Tier' : 'Downgrade to Starter'}
          </button>
        </div>

        {/* Pro */}
        <div style={{
          backgroundColor: '#FAFBF9',
          borderRadius: '18px',
          border: workspaceConfig.currentPlanId === 'pro' ? '2px solid #244A3D' : '1px solid #E7E8E1',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(36, 74, 61, 0.08)'
        }}>
          <div>
            <span className="badge badge-forest" style={{ marginBottom: '12px' }}>Recommended for Providers</span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#244A3D', marginBottom: '6px' }}>Professional</h3>
            <p style={{ fontSize: '12.5px', color: '#707A73', marginBottom: '16px' }}>
              For growing rehabilitation firms handling daily assessment caseloads.
            </p>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginBottom: '14px' }}>
              $480 <span style={{ fontSize: '12px', color: '#707A73', fontWeight: 500 }}>AUD / mo + GST</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#28332D' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>250 Reports / month</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>10 Consultant seats</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>Multi-framework audit formatting</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>Custom practice logo branding</span>
              </div>
            </div>
          </div>
          <button
            disabled={workspaceConfig.currentPlanId === 'pro'}
            onClick={() => setShowUpgradeModal(true)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '24px' }}
          >
            {workspaceConfig.currentPlanId === 'pro' ? 'Active Tier' : 'Upgrade to Professional'}
          </button>
        </div>

        {/* Enterprise */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          border: workspaceConfig.currentPlanId === 'enterprise' ? '2px solid #244A3D' : '1px solid #E7E8E1',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-sage" style={{ marginBottom: '12px' }}>National Networks</span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>Enterprise Network</h3>
            <p style={{ fontSize: '12.5px', color: '#707A73', marginBottom: '16px' }}>
              For state & national provider organisations requiring custom APIs.
            </p>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginBottom: '14px' }}>
              $1,190 <span style={{ fontSize: '12px', color: '#707A73', fontWeight: 500 }}>AUD / mo + GST</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#28332D' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>1,000+ Reports / month</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>50+ Consultant seats</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>Custom insurer rules engine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} color="#244A3D" />
                <span>Dedicated account manager</span>
              </div>
            </div>
          </div>
          <button
            disabled={workspaceConfig.currentPlanId === 'enterprise'}
            onClick={() => setShowUpgradeModal(true)}
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '24px' }}
          >
            {workspaceConfig.currentPlanId === 'enterprise' ? 'Active Tier' : 'Upgrade to Enterprise'}
          </button>
        </div>
      </div>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};
