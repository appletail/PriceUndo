import { findPriceCandidates } from './findPriceCandidates';

export const changePrice = () => {
  const patchPrices = () => {
    findPriceCandidates().forEach(({ original, element: el }) => {
      // 1) 복제해서 새 노드 생성 (클래스·스타일 유지)
      const newNode = el.cloneNode(false);
      newNode.dataset.pricePatched  = 'true';
      newNode.dataset.originalPrice = original;
      newNode.textContent           = '1,000원';

      // 2) 호버 시 토글 이벤트
      newNode.addEventListener('mouseenter', () => {
        newNode.textContent = newNode.dataset.originalPrice;
      });
      newNode.addEventListener('mouseleave', () => {
        newNode.textContent = '1,000원';
      });

      // 3) 원본을 새 노드로 대체
      el.replaceWith(newNode);
    });
  };

  // 초기 실행 & 이후 동적 로딩 대응
  patchPrices();
  new MutationObserver(patchPrices).observe(document.body, {
    childList: true,
    subtree: true,
  });
};
