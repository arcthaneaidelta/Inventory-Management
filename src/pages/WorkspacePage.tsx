import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Shield, 
  CreditCard, 
  Mail, 
  Check, 
  Trash2, 
  Globe, 
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TeamMember } from '../types';
import { InviteUserModal } from '../components/common/InviteUserModal';

export const WorkspacePage: React.FC = () => {
  const { team, removeMember, updateMemberRole, workspaceConfig, updateWorkspaceConfig, showToast } = useApp();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [orgName, setOrgName] = useState(workspaceConfig.orgName);
  const [timezone, setTimezone] = useState(workspaceConfig.timezone);
  const [anonymousMode, setAnonymousMode] = useState(workspaceConfig.anonymousMode);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkspaceConfig({
      orgName,
      timezone,
      anonymousMode
    });
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">{workspaceConfig.orgName}</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              • Workspace ID: {workspaceConfig.workspaceId}
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Workspace Administration & Clinical Team
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Manage consultant access, role permissions, and regional Australian reporting preferences.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="btn btn-primary"
        >
          <UserPlus size={16} />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* OVERVIEW STATS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Active Plan
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#244A3D', marginTop: '4px', textTransform: 'capitalize' }}>
            {workspaceConfig.currentPlanId} Plan
          </div>
          <div style={{ fontSize: '11.5px', color: '#8FA99A', marginTop: '2px' }}>
            Volume Assessment Cap
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Consultant Seats
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#28332D', marginTop: '4px' }}>
            {workspaceConfig.seatsUsed} / {workspaceConfig.seatsLimit}
          </div>
          <div style={{ fontSize: '11.5px', color: '#244A3D', fontWeight: 600, marginTop: '2px' }}>
            {workspaceConfig.seatsLimit - workspaceConfig.seatsUsed} Seats Available
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Reports Generated
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#244A3D', marginTop: '4px' }}>
            {workspaceConfig.reportsUsed} / {workspaceConfig.reportsLimit}
          </div>
          <div style={{ fontSize: '11.5px', color: '#707A73', marginTop: '2px' }}>
            Monthly Allowance
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Privacy Isolation
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#244A3D', marginTop: '4px' }}>
            Active
          </div>
          <div style={{ fontSize: '11.5px', color: '#8FA99A', marginTop: '2px' }}>
            Worker PII Isolated
          </div>
        </div>
      </div>

      {/* TEAM TABLE */}
      <div className="card card-large" style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D' }}>
              Rehabilitation Consultants & Practice Staff
            </h2>
            <p style={{ fontSize: '12.5px', color: '#707A73', marginTop: '2px' }}>
              Team members authorized to create FCE assessments and export insurer packages.
            </p>
          </div>
          <span className="badge badge-forest">{team.length} Active Members</span>
        </div>

        <div className="table-container">
          <table className="rehab-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Role & Permissions</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: '#D5E2D8',
                        color: '#244A3D',
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#28332D', fontSize: '13.5px' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#707A73' }}>
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={member.role}
                      onChange={(e) => updateMemberRole(member.id, e.target.value as TeamMember['role'])}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid #E7E8E1',
                        fontSize: '12.5px',
                        color: '#28332D',
                        backgroundColor: '#FFFFFF',
                        fontWeight: 500
                      }}
                    >
                      <option value="Workspace Owner">Workspace Owner</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-forest' : 'badge-amber'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td style={{ color: '#707A73', fontSize: '12.5px' }}>
                    {member.lastActive}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {member.role !== 'Workspace Owner' && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: '#B76D66' }}
                        title="Remove member"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WORKSPACE PREFERENCES FORM */}
      <div className="card" style={{ padding: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
          Practice Preferences & Report Configuration
        </h2>
        <p style={{ fontSize: '13px', color: '#707A73', marginBottom: '24px' }}>
          Customize regional defaults and insurer export branding.
        </p>

        <form onSubmit={handleSaveSettings} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="input-group">
            <label className="input-label">Organisation Legal Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Default Australian Time Zone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="input-select"
            >
              <option value="Australia/Sydney (AEST)">Australia/Sydney (AEST / AEDT)</option>
              <option value="Australia/Melbourne (AEST)">Australia/Melbourne (AEST)</option>
              <option value="Australia/Brisbane (AEST)">Australia/Brisbane (AEST)</option>
              <option value="Australia/Adelaide (ACST)">Australia/Adelaide (ACST)</option>
              <option value="Australia/Perth (AWST)">Australia/Perth (AWST)</option>
            </select>
          </div>

          <div style={{
            gridColumn: 'span 2',
            padding: '16px',
            backgroundColor: '#FAF9F5',
            borderRadius: '12px',
            border: '1px solid #E7E8E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={20} color="#244A3D" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
                  Enforce Anonymous Worker PII Mode
                </div>
                <div style={{ fontSize: '12px', color: '#707A73' }}>
                  Strictly isolate candidate names from cloud payloads; require WRK-xxxx reference tokens.
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={anonymousMode}
              onChange={(e) => setAnonymousMode(e.target.checked)}
              style={{ accentColor: '#244A3D', width: 20, height: 20, cursor: 'pointer' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button type="submit" className="btn btn-primary">
              Save Workspace Settings
            </button>
          </div>
        </form>
      </div>

      {/* Invite Modal */}
      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
};
