/**
 * 1,504 → "1.5k+". Rounds down, so it never claims more than the real count;
 * below 1,000 the exact number is shown as it is.
 */
export function compactCount(n: number) {
  if (n < 1000) return n.toLocaleString("en-US");
  return `${Math.floor(n / 100) / 10}k+`;
}
