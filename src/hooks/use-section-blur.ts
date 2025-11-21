import { useEffect, useState } from 'react';

export function useSectionBlur() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    let scrollTimeout: number;

    const getScrollContainer = () =>
      document.getElementById('main-scroll-container');

    const handleScroll = () => {
      const container = getScrollContainer();
      const scrollY = container ? container.scrollTop : window.scrollY;
      const windowHeight = container
        ? container.clientHeight
        : window.innerHeight;

      // Clear previous timeout
      window.clearTimeout(scrollTimeout);

      // Set a very short timeout to activate blur quickly
      scrollTimeout = window.setTimeout(() => {
        // Determine which section we're on, based on snap-height
        const currentSection = Math.round(scrollY / windowHeight);

        // Apply blur only if we're NOT on the first section (section 0)
        const shouldBlur = currentSection > 0;
        setIsBlurred(shouldBlur);
      }, 20); // Much faster response
    };

    const container = getScrollContainer();

    if (container) {
      container.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    handleScroll(); // Initial call

    return () => {
      const c = getScrollContainer();
      if (c) {
        c.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
      window.clearTimeout(scrollTimeout);
    };
  }, []);

  return { blur: isBlurred ? 25 : 0, darken: isBlurred };
}
