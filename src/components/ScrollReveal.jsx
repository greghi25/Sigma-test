import { useEffect, useRef } from 'react';

export default function ScrollReveal() {
  const paragraphRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    // Split paragraph into words
    function wrapWords(element) {
      const childNodes = Array.from(element.childNodes);
      element.innerHTML = '';

      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/(\s+)/);
          words.forEach(word => {
            if (word.trim().length > 0) {
              const span = document.createElement('span');
              span.className = 'reveal-word';
              span.textContent = word;
              element.appendChild(span);
            } else {
              element.appendChild(document.createTextNode(word));
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.add('reveal-word');
          element.appendChild(node);
        }
      });
    }

    wrapWords(paragraph);

    const words = document.querySelectorAll('.reveal-word');
    wordsRef.current = words;

    function handleScroll() {
      const windowHeight = window.innerHeight;
      const rect = paragraph.getBoundingClientRect();
      const startPos = windowHeight * 0.8;
      const endPos = windowHeight * 0.4;
      const distance = startPos - endPos;
      let progress = (startPos - rect.top) / distance;
      progress = Math.max(0, Math.min(1, progress));
      const litWordsCount = Math.floor(progress * words.length);

      words.forEach((word, index) => {
        if (index < litWordsCount) {
          word.style.opacity = '1';
        } else {
          word.style.opacity = '0.2';
        }
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="crowded-market-section">
      <div className="progressive-container text-align-center">
        <p className="scroll-reveal-paragraph" id="reveal-text" ref={paragraphRef}>
          Founded in 1976, Sigma Investments is Maastricht University's premier student-managed investment fund. We bridge the gap between academia and practice, actively managing an equity portfolio focused on value investing and solid fundamentals.
        </p>
      </div>
    </section>
  );
}
