import { type KnownColor, sequence } from '../backend/sequence'

export function checkNumberPercUndefined(val?: unknown): val is number | `${number}%` | undefined {
  if (typeof val === 'number' || typeof val === 'undefined') {
    return true
  }
  if (typeof val === 'string' && val.endsWith('%')) {
    return !isNaN(parseFloat(val.substring(0, val.length - 1)))
  }
  return false
}

export function checkColorNullUndefined(val?: unknown): val is null | undefined | KnownColor {
  return val === null || val === undefined || sequence.isColor(val)
}
