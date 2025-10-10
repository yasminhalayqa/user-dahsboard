import React, { useEffect, useState } from 'react';

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const getToastIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getToastClass = () => {
    const baseClass = 'toast';
    const typeClass = `toast-${toast.type}`;
    const visibilityClass = isVisible && !isLeaving ? 'toast-visible' : '';
    const leavingClass = isLeaving ? 'toast-leaving' : '';
    
    return [baseClass, typeClass, visibilityClass, leavingClass].filter(Boolean).join(' ');
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-content">
        <span className="toast-icon">{getToastIcon()}</span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close" 
          onClick={handleRemove}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      <div className="toast-progress">
        <div 
          className="toast-progress-bar" 
          style={{ 
            animationDuration: `${toast.duration}ms` 
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
