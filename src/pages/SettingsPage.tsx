import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Sliders, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Bell, 
  Save 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { workspaceConfig, updateWorkspaceConfig, showToast } = useApp();

  const [defaultLifting, setDefaultLifting] = useState('10');
  const [defaultSitting, setDefaultSitting] = useState('30');
  const [includeIcare, setIncludeIcare] = useState(true);
  const [includeComcare, setIncludeComcare] = useState(true);
  const [includeWorkSafe, setIncludeWorkSafe] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Clinical presets and practice preferences saved', 'success');
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset simulated demonstration state to initial baseline?')) {
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1040, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-forest">Practice Configuration</span>
          <span style={{ fontSize: '13px', color: '#707A73' }}>• System & Clinical Defaults</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
          Settings & Practice Presets
        </h1>
        <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
          Configure default functional capacity limits, insurer frameworks, and demonstration options.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Practice Profile Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D', marginBottom: '16px' }}>
            Practice Entity & Provider Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label">Provider Legal Name</label>
              <input
                type="text"
                disabled
                value="Horizon Rehabilitation Group Pty Ltd"
                className="input-text"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Australian Business Number (ABN)</label>
              <input
                type="text"
                disabled
                value="84 921 445 102"
                className="input-text"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Practice Head Office</label>
              <input
                type="text"
                disabled
                value="Suite 402, 180 George Street, Sydney NSW 2000"
                className="input-text"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Contact Email</label>
              <input
                type="text"
                disabled
                value="clinical.procurement@horizonrehab.com.au"
                className="input-text"
              />
            </div>
          </div>
        </div>

        {/* Clinical Matching Defaults */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D', marginBottom: '16px' }}>
            FCE Wizard Baseline Parameters
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label">Default Occasional Lifting Baseline (kg)</label>
              <input
                type="number"
                value={defaultLifting}
                onChange={(e) => setDefaultLifting(e.target.value)}
                className="input-text"
              />
              <span className="input-helper">Populates step 2 of new assessments</span>
            </div>

            <div className="input-group">
              <label className="input-label">Default Continuous Sitting Tolerance (min)</label>
              <input
                type="number"
                value={defaultSitting}
                onChange={(e) => setDefaultSitting(e.target.value)}
                className="input-text"
              />
              <span className="input-helper">Triggers sit-stand recommendations under 35 mins</span>
            </div>
          </div>
        </div>

        {/* Insurer Framework Presets */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D', marginBottom: '16px' }}>
            Statutory Insurer Compliance Presets
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#28332D' }}>icare NSW Workers Compensation</div>
                <div style={{ fontSize: '11.5px', color: '#707A73' }}>Format quotes according to NSW SIRA guidelines</div>
              </div>
              <input
                type="checkbox"
                checked={includeIcare}
                onChange={(e) => setIncludeIcare(e.target.checked)}
                style={{ accentColor: '#244A3D', width: 18, height: 18 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#28332D' }}>Comcare Scheme (Commonwealth)</div>
                <div style={{ fontSize: '11.5px', color: '#707A73' }}>Federal statutory clinical justification alignment</div>
              </div>
              <input
                type="checkbox"
                checked={includeComcare}
                onChange={(e) => setIncludeComcare(e.target.checked)}
                style={{ accentColor: '#244A3D', width: 18, height: 18 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#28332D' }}>WorkSafe Victoria</div>
                <div style={{ fontSize: '11.5px', color: '#707A73' }}>Victorian return-to-work equipment schedule</div>
              </div>
              <input
                type="checkbox"
                checked={includeWorkSafe}
                onChange={(e) => setIncludeWorkSafe(e.target.checked)}
                style={{ accentColor: '#244A3D', width: 18, height: 18 }}
              />
            </div>
          </div>
        </div>

        {/* Demonstration Actions */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FAF9F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D' }}>
                Reset Demonstration Environment
              </h3>
              <p style={{ fontSize: '12.5px', color: '#707A73', marginTop: '2px' }}>
                Restore initial sample assessments, notification feeds, and supplier timestamps.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetDemoData}
              className="btn btn-outline btn-sm"
            >
              <RotateCcw size={14} />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
