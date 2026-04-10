import React, { useEffect } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-container">
      <div className="toast-icon">✓</div>
      <p className="toast-message">{message}</p>
    </div>
  );
};

export default Toast;