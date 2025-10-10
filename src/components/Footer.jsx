import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>© {currentYear} Smart Task Organizer App   </p>
          <p className="made-by">
            Made with ❤️ by <span className="author-name">Jana</span>
          </p>
        </div>
        
        <div className="footer-links">
          <a 
            href="https://github.com/janarabaya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
            title="GitHub"
          >
            <span className="footer-icon">🐙</span>
            GitHub
          </a>
          
          <a 
            href="https://mail.google.com/mail/u/1/?ogbl" 
            className="footer-link"
            title="Contact"
          >
            <span className="footer-icon">📧</span>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
