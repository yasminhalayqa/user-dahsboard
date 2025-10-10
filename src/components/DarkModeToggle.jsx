import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
      <button onClick={toggleTheme} className="form-group button">
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

export default DarkModeToggle;