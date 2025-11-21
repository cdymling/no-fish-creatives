import { useEffect, useState } from 'react';

export function useSectionBlur() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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

      // User is scrolling
      setIsScrolling(true);

      // Clear previous timeout
      window.clearTimeout(scrollTimeout);

      // Set a timeout to detect when scrolling has stopped
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);

        // Determine which section we're on, based on snap-height
        const currentSection = Math.round(scrollY / windowHeight);

        // Apply blur only if we're NOT on the first section (section 0)
        const shouldBlur = currentSection > 0;
        setIsBlurred(shouldBlur);
      }, 60);
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

  // Return blur state only when not scrolling
  const blurValue = isScrolling ? 0 : isBlurred ? 25 : 0;
  const darkenValue = !isScrolling && isBlurred;

  return { blur: blurValue, darken: darkenValue };
}
