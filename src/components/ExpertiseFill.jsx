import { useEffect, useRef } from 'react';

export default function ExpertiseFill() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const body = bodyRef.current;
    const section = sectionRef.current;
    if (!heading || !body || !section) return;

    function wrapTextWords(el, wordClass) {
      const nodes = Array.from(el.childNodes);
      el.innerHTML = '';
      nodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (part) {
            if (part.trim().length > 0) {
              const span = document.createElement('span');
              span.className = wordClass;
              span.textContent = part;
              el.appendChild(span);
            } else {
              el.appendChild(document.createTextNode(part));
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.add(wordClass);
          el.appendChild(node);
        }
      });
    }

    wrapTextWords(heading, 'expertise-word');
    wrapTextWords(body, 'expertise-word');

    const allWords = section.querySelectorAll('.expertise-word');

    function onScroll() {
      const wh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const startPos = wh * 0.85;
      const endPos = wh * 0.2;
      const distance = startPos - endPos;
      let progress = (startPos - rect.top) / distance;
      progress = Math.max(0, Math.min(1, progress));

      const litCount = Math.floor(progress * allWords.length);
      allWords.forEach(function (w, i) {
        w.style.opacity = i < litCount ? '1' : '0.15';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="expertise-fill-section" id="expertise-fill-section" ref={sectionRef}>
      <div className="expertise-fill-container">
        
        <p className="expertise-fill-body" id="expertise-fill-body" ref={bodyRef}>
          Our team of dedicated student analysts brings rigorous academic training and fresh perspectives to equity research. Through hands-on portfolio management, weekly investment discussions, and deep fundamental analysis, we develop the skills and judgment needed to identify undervalued opportunities across global markets — bridging the gap between university learning and professional practice.
        </p>
      </div>
    </section>
  );
}
