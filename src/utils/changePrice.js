import { findPriceCandidates } from './findPriceCandidates';
import { undoPrice } from './undoPrice';

export const changePrice = () => {
  const patchPrices = () => {
    findPriceCandidates().forEach(({ original, element: el }) => {
      const newNode = el.cloneNode(false);
      newNode.dataset.pricePatched  = 'true';
      newNode.dataset.originalPrice = original;

      let newPrice = undoPrice(original);
      newNode.textContent = newPrice;

      newNode.addEventListener('mouseenter', () => {
        newNode.textContent = newNode.dataset.originalPrice;
      });
      newNode.addEventListener('mouseleave', () => {
        newNode.textContent = newPrice;
      });

      el.replaceWith(newNode);
    });
  };

  patchPrices();
  new MutationObserver(patchPrices).observe(document.body, {
    childList: true,
    subtree: true,
  });
};
