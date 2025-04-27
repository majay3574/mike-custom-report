import { useState, useEffect } from 'react';

const useDarkMode = (): [boolean, () => void] => {
  // Use a function for initial state to avoid hydration mismatch
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('darkMode');
      if (savedPreference !== null) {
        return JSON.parse(savedPreference);
      }
      
      // Check for OS preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  useEffect(() => {
    // Update localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', darkMode ? '#1f2937' : '#ffffff');
    }
  }, [darkMode]);
  
  // Listen for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    // Add event listener with modern API
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  
  return [darkMode, toggleDarkMode];
};

export default useDarkMode;