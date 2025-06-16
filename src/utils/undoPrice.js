import { detectEndPrice } from "./detectEndPrice";

export const undoPrice = (originalPrice) => {
  const isWonStr = originalPrice.charAt(originalPrice.length-1) === '원' ? '원' : '';
  let price = parseInt(originalPrice.replace(/[^0-9]/g, ''));
  const unit = detectEndPrice(price);
  price = unit ? Math.ceil(price / unit) * unit : price;
  
  return `${unit ? '🔄 ' : '' }${price.toLocaleString()}${isWonStr}`;
}