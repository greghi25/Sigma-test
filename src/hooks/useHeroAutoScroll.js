import { useEffect } from 'react';

/**
 * On desktop only, auto-scrolls past the hero after a delay.
 * @param {string} heroId - The id of the hero section element
 * @param {number} delay - ms to wait before scrolling (default 1800)
 */
export default function useHeroAutoScroll(heroId, delay = 1800) {
  useEffect(() => {
    if (window.innerWidth <= 991) return; // desktop only

    const timer = setTimeout(() => {
      const hero = document.getElementById(heroId);
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }, delay);

    return () => clearTimeout(timer);
  }, [heroId, delay]);
}
