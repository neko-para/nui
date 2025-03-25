export const PresetColor = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37
} as const
export const BackgroundAlter = 10
export const BrightAlter = 60

export type PresetColor = keyof typeof PresetColor
export type BrightPresetColor<K = PresetColor> = K extends string ? `bright-${K}` : never

export const sequence = {
  isPreset(key: string): key is PresetColor | BrightPresetColor {
    return (key.startsWith('bright-') ? key.substring(7) : key) in PresetColor
  },
  isBright(key: PresetColor | BrightPresetColor): key is BrightPresetColor {
    return key.startsWith('bright-')
  },
  trimBrightPreset(key: BrightPresetColor): PresetColor {
    return key.substring(7) as PresetColor
  },

  switchBuffer(alter = true) {
    if (alter) {
      process.stdout.write('\x1b[?1049h')
    } else {
      process.stdout.write('\x1b[?1049l')
    }
  },

  clearSeq() {
    return this.moveSeq(1, 1) + `\x1b[J`
  },
  clear() {
    process.stdout.write(this.clearSeq())
  },
  moveSeq(row: number, col: number) {
    return `\x1b[${row + 1};${col + 1}H`
  },
  move(row: number, col: number) {
    process.stdout.write(this.moveSeq(row, col))
  },

  resetColorSeq() {
    return `\x1b[0m`
  },
  resetColor() {
    process.stdout.write(this.resetColorSeq())
  },
  presetForegroundSeq(color: PresetColor | BrightPresetColor) {
    if (this.isBright(color)) {
      return `\x1b[${PresetColor[this.trimBrightPreset(color)] + BrightAlter}m`
    } else {
      return `\x1b[${PresetColor[color]}m`
    }
  },
  presetForeground(color: PresetColor | BrightPresetColor) {
    process.stdout.write(this.presetForegroundSeq(color))
  },
  presetBackgroundSeq(color: PresetColor | BrightPresetColor) {
    if (this.isBright(color)) {
      return `\x1b[${PresetColor[this.trimBrightPreset(color)] + BackgroundAlter + BrightAlter}m`
    } else {
      return `\x1b[${PresetColor[color] + BackgroundAlter}m`
    }
  },
  presetBackground(color: PresetColor | BrightPresetColor) {
    process.stdout.write(this.presetBackgroundSeq(color))
  }
}
