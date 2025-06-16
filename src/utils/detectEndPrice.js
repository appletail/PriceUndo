export const detectEndPrice = (price, maxUnit = 10000) => {
  const units = [];
  for (let unit = maxUnit; unit >= 10; unit /= 10) {
    units.push(unit);
  }

  for (const unit of units) {
    const rem = price % unit;
    const step = unit / 10;
    if (rem <= unit - step && rem >= unit - 2 * step) {
      return unit;
    }
  }

  return null;
}