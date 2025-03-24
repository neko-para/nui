export function checkNumberPercUndefined(val?: unknown): val is number | `${number}%` | undefined {
  if (typeof val === 'number' || typeof val === 'undefined') {
    return true
  }
  if (typeof val === 'string' && val.endsWith('%')) {
    return !isNaN(parseFloat(val.substring(0, val.length - 1)))
  }
  return false
}
