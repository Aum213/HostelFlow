import React from 'react';

const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Resolved':
        return {
          backgroundColor: '#dcfce7',
          color: '#166534',
          border: '1px solid #bbf7d0'
        };
      case 'Pending':
        return {
          backgroundColor: '#fef9c3',
          color: '#854d0e',
          border: '1px solid #fef08a'
        };
      default:
        return {
          backgroundColor: '#f1f5f9',
          color: '#475569',
          border: '1px solid #e2e8f0'
        };
    }
  };

  const badgeStyle = {
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    display: 'inline-block',
    ...getStyles()
  };

  return <span style={badgeStyle}>{status}</span>;
};

export default StatusBadge;