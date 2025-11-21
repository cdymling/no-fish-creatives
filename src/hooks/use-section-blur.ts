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

        // Sections with text that should have blur:
        // 1: about-title, 2: about-content, 3: campaign-carousel
        // 5: services-title, 6: services-content
        // 8: clients-title, 9: clients-content
        // 10: contact-title, 11: contact
        // Sections WITHOUT text (no blur): 0: home, 4: about-video, 7: services-video, 12: work-video
        const sectionsWithText = [1, 2, 3, 5, 6, 8, 9, 10, 11];
        
        const shouldBlur = sectionsWithText.includes(currentSection);
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
