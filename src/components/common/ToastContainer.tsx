import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        const Icon = toast.type === 'success' 
          ? CheckCircle2 
          : toast.type === 'warning' 
            ? AlertTriangle 
            : Info;
        
        const iconColor = toast.type === 'success' 
          ? '#244A3D' 
          : toast.type === 'warning' 
            ? '#C49B55' 
            : '#8FA99A';

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              {toast.title && (
                <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#28332D', marginBottom: '2px' }}>
                  {toast.title}
                </div>
              )}
              <div style={{ fontSize: '13px', color: '#707A73', wordBreak: 'break-word' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: '#9DA6A0',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '8px'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
