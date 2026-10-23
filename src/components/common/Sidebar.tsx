import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  FileText, 
  Layers, 
  PackageCheck, 
  FileSpreadsheet, 
  RefreshCw, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentUser, logout, workspaceConfig } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/app', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/app/assessments/new', label: 'New Assessment', icon: FilePlus },
    { to: '/app/assessments', label: 'Assessment History', icon: FileText },
    { to: '/app/catalogue', label: 'Equipment Catalogue', icon: Layers },
    { to: '/app/quotes', label: 'Quote Packages', icon: PackageCheck },
    { to: '/app/reports', label: 'Audit Reports', icon: FileSpreadsheet },
    { to: '/app/inventory', label: 'Inventory Sync', icon: RefreshCw },
    { to: '/app/workspace', label: 'Workspace & Team', icon: Users },
    { to: '/app/billing', label: 'Billing & Usage', icon: CreditCard },
    { to: '/app/privacy', label: 'Privacy & Architecture', icon: ShieldCheck },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: collapsed ? 80 : 256,
      minWidth: collapsed ? 80 : 256,
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E7E8E1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 100,
      userSelect: 'none'
    }}>
      {/* Top Brand Header */}
      <div>
        <div style={{
          padding: '20px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid #F2F3EC'
        }}>
          {!collapsed ? (
            <div 
              onClick={() => navigate('/app')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              {/* Custom Clinical Ergonomic Logo Mark */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: '#244A3D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(36, 74, 61, 0.2)'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18C8 13 11 8 18 8M8 18C11 15 14 11 18 11M11 18C13 16 15 14 18 14" stroke="#8FA99A" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="1.8" fill="#E9F0EA" />
                </svg>
              </div>
              <div>
                <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '17px', color: '#244A3D', letterSpacing: '-0.02em' }}>
                  RehabEquip <span style={{ color: '#8FA99A', fontWeight: 600 }}>AU</span>
                </span>
                <div style={{ fontSize: '11px', color: '#707A73', fontWeight: 500 }}>
                  Clinical Quote Engine
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setCollapsed(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: '#244A3D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 18C8 13 11 8 18 8M8 18C11 15 14 11 18 11M11 18C13 16 15 14 18 14" stroke="#8FA99A" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="18" cy="8" r="1.8" fill="#E9F0EA" />
              </svg>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#707A73',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                title={collapsed ? item.label : undefined}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: collapsed ? '10px 0' : '9px 14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#244A3D' : '#707A73',
                  backgroundColor: isActive ? '#E9F0EA' : 'transparent',
                  transition: 'all 0.18s ease',
                  textDecoration: 'none'
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} color={isActive ? '#244A3D' : '#707A73'} />
                    {!collapsed && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Workspace Info */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid #F2F3EC',
        backgroundColor: '#FCFCF9'
      }}>
        {!collapsed ? (
          <div>
            {/* Usage Quick Meter */}
            <div style={{
              padding: '10px 12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E7E8E1',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#28332D' }}>Reports Allowance</span>
                <span style={{ color: '#244A3D', fontWeight: 700 }}>
                  {workspaceConfig.reportsUsed} / {workspaceConfig.reportsLimit}
                </span>
              </div>
              <div style={{
                height: '4px',
                backgroundColor: '#E7E8E1',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(workspaceConfig.reportsUsed / workspaceConfig.reportsLimit) * 100}%`,
                  backgroundColor: '#244A3D'
                }} />
              </div>
            </div>

            {/* User Info Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
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
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {currentUser.avatarInitials}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#28332D',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}>
                    {currentUser.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#707A73',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}>
                    {currentUser.organisation}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign out of demo"
                style={{
                  padding: '6px',
                  color: '#707A73',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
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
              {currentUser.avatarInitials}
            </div>
            <button
              onClick={logout}
              title="Sign out"
              style={{ padding: '6px', color: '#707A73' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
