import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1e293b',
        color: '#94a3b8',
        padding: '3rem 4rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        <div>
          <h3
            style={{
              color: 'white',
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
            }}
          >
            HOSTELFLOW
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
            Modernizing campus life through efficient maintenance and transparent
            communication.
          </p>
        </div>

        <div>
          <h4
            style={{
              color: 'white',
              margin: '0 0 1rem 0',
              fontSize: '1rem',
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '0.9rem',
              lineHeight: '1.8',
            }}
          >
            <li>Maintenance Schedule</li>
            <li>Hostel Rules</li>
            <li>Emergency Contacts</li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              color: 'white',
              margin: '0 0 1rem 0',
              fontSize: '1rem',
            }}
          >
            Support
          </h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.8', margin: 0 }}>
            University Maintenance Desk
            <br />
            Office Hours: 9 AM - 6 PM
            <br />
            support@university.edu.in
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #334155',
          fontSize: '0.8rem',
        }}
      >
        © 2026 Smart Hostel System | Designed for Marwadi University
      </div>
    </footer>
  );
};

export default Footer;