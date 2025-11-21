import { useEffect, useState } from 'react';

export function useSectionBlur() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // User is scrolling
      setIsScrolling(true);
      
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to detect when scrolling has stopped
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        
        // Determine which section we're on
        const currentSection = Math.round(scrollY / windowHeight);
        
        // Apply blur only if we're NOT on the first section (section 0)
        setIsBlurred(currentSection > 0);
      }, 150); // Wait 150ms after scroll stops
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Return blur state only when not scrolling
  return isScrolling ? { blur: 0, darken: false } : { blur: isBlurred ? 8 : 0, darken: isBlurred };
}
