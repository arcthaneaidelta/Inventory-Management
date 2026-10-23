import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Plus, 
  Clock, 
  CheckCheck, 
  Trash2, 
  Shield, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, clearNotifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      height: 72,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E7E8E1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Title / Context */}
      <div>
        {title ? (
          <div>
            <h1 style={{ fontSize: '19px', fontWeight: 700, color: '#28332D', letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: '12.5px', color: '#707A73', marginTop: '2px' }}>
                {subtitle}
              </p>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-forest">
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#244A3D' }} />
              Simulated Demo Mode
            </span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              All inventory pricing and stock data is illustrative
            </span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* AEST Time indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#F8F8F4',
          borderRadius: '8px',
          border: '1px solid #E7E8E1',
          fontSize: '12px',
          color: '#707A73',
          fontWeight: 500
        }}>
          <Clock size={13} color="#244A3D" />
          <span>AEST (Sydney)</span>
        </div>

        {/* Notifications Button & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Rehabilitation Notifications"
            style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              border: '1px solid #E7E8E1',
              backgroundColor: showNotifications ? '#E9F0EA' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#28332D',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -3,
                right: -3,
                backgroundColor: '#244A3D',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                width: 17,
                height: 17,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: 48,
              right: 0,
              width: 360,
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E7E8E1',
              boxShadow: '0 16px 40px rgba(36, 74, 61, 0.12)',
              zIndex: 200,
              overflow: 'hidden',
              animation: 'fadeUp 0.18s ease-out'
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #F2F3EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FAF9F5'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#28332D' }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="badge badge-forest" style={{ padding: '2px 6px', fontSize: '11px' }}>
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={markAllNotificationsAsRead}
                    title="Mark all as read"
                    style={{ padding: '4px', color: '#707A73', borderRadius: '4px' }}
                  >
                    <CheckCheck size={16} />
                  </button>
                  <button
                    onClick={clearNotifications}
                    title="Clear all"
                    style={{ padding: '4px', color: '#707A73', borderRadius: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '32px 20px', textAlign: 'center', color: '#707A73', fontSize: '13px' }}>
                    No active notifications
                  </div>
                ) : (
                  notifications.map(item => (
                    <div
                      key={item.id}
                      onClick={() => markNotificationAsRead(item.id)}
                      style={{
                        padding: '14px 18px',
                        borderBottom: '1px solid #F2F3EC',
                        backgroundColor: item.read ? '#FFFFFF' : '#F9FAF7',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: item.read ? 600 : 700,
                          color: '#28332D'
                        }}>
                          {item.title}
                        </span>
                        <span style={{ fontSize: '11px', color: '#9DA6A0' }}>
                          {item.timestamp}
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#707A73', lineHeight: 1.4 }}>
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick New Assessment Button */}
        <button
          onClick={() => navigate('/app/assessments/new')}
          className="btn btn-primary"
          style={{ padding: '9px 16px', fontSize: '13.5px' }}
        >
          <Plus size={16} />
          <span>New Assessment</span>
        </button>
      </div>
    </header>
  );
};
