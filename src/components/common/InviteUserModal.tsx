import React, { useState } from 'react';
import { X, UserPlus, Mail, Shield, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({ isOpen, onClose }) => {
  const { inviteTeamMember, workspaceConfig } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Consultant');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    inviteTeamMember(name.trim(), email.trim(), role);
    setName('');
    setEmail('');
    onClose();
  };

  const seatsRemaining = workspaceConfig.seatsLimit - workspaceConfig.seatsUsed;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              backgroundColor: '#E9F0EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserPlus size={20} color="#244A3D" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#28332D' }}>Invite Team Member</h3>
              <p style={{ fontSize: '12.5px', color: '#707A73' }}>
                Add an OT or consultant to {workspaceConfig.orgName}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#707A73', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {seatsRemaining <= 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            backgroundColor: '#FDF7EC',
            borderRadius: '10px',
            border: '1px solid rgba(196, 155, 85, 0.3)',
            marginBottom: '18px',
            fontSize: '12.5px',
            color: '#796135'
          }}>
            <AlertCircle size={16} color="#C49B55" />
            <span>Workspace seat limit: {workspaceConfig.seatsUsed} of {workspaceConfig.seatsLimit} used.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Lachlan Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Work Email Address</label>
            <input
              type="email"
              required
              placeholder="consultant@horizonrehab.com.au"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Workspace Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamMember['role'])}
              className="input-select"
            >
              <option value="Consultant">Consultant (Creates assessments, manages quotes)</option>
              <option value="Administrator">Administrator (Manages team, billing, templates)</option>
              <option value="Viewer">Viewer (Read-only review of reports)</option>
            </select>
            <span className="input-helper">
              Simulated invitation tokens expire after 7 days in demo mode.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Send Invitation
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
