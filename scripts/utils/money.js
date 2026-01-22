export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2); //toFixed always returns a string
}
//each file can have only one default export
//Imports are cleaner, more concise, and do not require curly braces ({}).
export default formatCurrency;