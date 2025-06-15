export function findPriceCandidates() {
  const pricePattern = /^[₩]?[0-9]{1,3}(,[0-9]{3})*(원)?$/;
  const candidates = [];

  document
    .querySelectorAll('span, div, p, b, strong, em')
    .forEach(el => {
      if (el.dataset.pricePatched === 'true') return;
      if (el.children.length > 0) return;

      const txt = el.textContent?.trim();
      if (txt && pricePattern.test(txt)) {
        candidates.push({ original: txt, element: el });
      }
    });
    console.log('Price candidates found:', candidates.length);
  return candidates;
}
