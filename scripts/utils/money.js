export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}
//each file can have only one default export
export default formatCurrency;