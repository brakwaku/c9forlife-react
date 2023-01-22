import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook
export const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0 }); // Scroll to the top of the browser window when changing route
    }, [location]);
  };