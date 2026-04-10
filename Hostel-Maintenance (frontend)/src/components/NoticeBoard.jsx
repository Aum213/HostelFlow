import React from 'react';
import '../styles/NoticeBoard.css';

const NoticeBoard = ({ note }) => {
  const displayNote = note || "No active notices at this time. Check back later for hostel updates.";

  return (
    <div className="chalkboard-frame">
      <div className="chalkboard-surface">
        <div className="chalkboard-header">HOSTEL NOTICE</div>
        <div className="chalkboard-content">
          <p>{displayNote}</p>
        </div>
        <div className="chalkboard-footer">— Administration Office</div>
      </div>
      {/* THE NEW REALISM TOUCH */}
      <div className="chalk-tray">
        <div className="chalk white-chalk"></div>
        <div className="chalk yellow-chalk"></div>
        <div className="eraser"></div>
      </div>
    </div>
  );
};

export default NoticeBoard;