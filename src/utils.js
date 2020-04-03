export const wrapNumber = (n, min, max) => {
  if (n > max) return n - max * 2
  if (n < min) return n + Math.abs(min) * 2
  return n
}
