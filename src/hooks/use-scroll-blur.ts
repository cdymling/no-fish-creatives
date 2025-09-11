import { useEffect, useState } from 'react';

export function useScrollBlur() {
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start blurring after first viewport height (when second section starts)
      const startBlur = windowHeight;
      const maxBlur = 20; // Maximum blur in pixels
      
      if (scrollY <= startBlur) {
        // No blur for first section
        setBlurAmount(0);
      } else {
        // Calculate blur amount based on scroll position
        const scrollProgress = (scrollY - startBlur) / (windowHeight * 2);
        const blur = Math.min(scrollProgress * maxBlur, maxBlur);
        setBlurAmount(blur);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return blurAmount;
}