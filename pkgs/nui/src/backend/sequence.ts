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

  clear() {
    process.stdout.write(`\x1b[2J`)
  },
  move(row: number, col: number) {
    process.stdout.write(`\x1b[${row + 1};${col + 1}H`)
  },

  resetColor() {
    process.stdout.write(`\x1b[0m`)
  },
  presetForeground(color: PresetColor | BrightPresetColor) {
    if (this.isBright(color)) {
      process.stdout.write(`\x1b[${PresetColor[this.trimBrightPreset(color)] + BrightAlter}m`)
    } else {
      process.stdout.write(`\x1b[${PresetColor[color]}m`)
    }
  },
  presetBackground(color: PresetColor | BrightPresetColor) {
    if (this.isBright(color)) {
      process.stdout.write(
        `\x1b[${PresetColor[this.trimBrightPreset(color)] + BackgroundAlter + BrightAlter}m`
      )
    } else {
      process.stdout.write(`\x1b[${PresetColor[color] + BackgroundAlter}m`)
    }
  }
}
