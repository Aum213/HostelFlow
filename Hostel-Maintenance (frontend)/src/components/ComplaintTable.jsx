import React from 'react';
import StatusBadge from './StatusBadge';
import '../styles/ComplaintTable.css';

const ComplaintTable = ({ complaints, isAdmin, onStatusChange }) => {
  if (!complaints || complaints.length === 0) {
    return <p style={{ padding: '20px', color: '#64748b' }}>No complaints found.</p>;
  }

  return (
    <div className="table-container">
      <table className="complaint-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hostel</th>
            <th>Category</th>
            <th>Room</th>
            <th>Description</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item._id}>
              <td>#{item.ticketId}</td>
              <td style={{fontWeight: '600', color: 'var(--brand-primary, #4f46e5)'}}>{item.hostel}</td>
              <td><strong>{item.category}</strong></td>
              <td>{item.roomNumber}</td>
              <td className="desc-text">{item.description}</td>
              <td><StatusBadge status={item.status} /></td>
              {isAdmin && (
                <td>
                  <select 
                    className="status-updater"
                    value={item.status}
                    onChange={(e) => onStatusChange(item.ticketId, e.target.value)}
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Resolved">Set Resolved</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;