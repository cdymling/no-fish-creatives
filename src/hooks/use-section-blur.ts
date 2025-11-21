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
        
        console.log('Current section:', currentSection, 'ScrollY:', scrollY, 'WindowHeight:', windowHeight);
        
        // Apply blur only if we're NOT on the first section (section 0)
        const shouldBlur = currentSection > 0;
        setIsBlurred(shouldBlur);
        
        console.log('Should blur:', shouldBlur);
      }, 100); // Reduced from 150ms to 100ms for faster response
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Return blur state only when not scrolling
  const blurValue = isScrolling ? 0 : (isBlurred ? 25 : 0); // Increased to 25px for stronger blur
  const darkenValue = isScrolling ? false : isBlurred;
  
  console.log('Returning blur:', blurValue, 'darken:', darkenValue, 'isScrolling:', isScrolling);
  
  return { blur: blurValue, darken: darkenValue };
}
