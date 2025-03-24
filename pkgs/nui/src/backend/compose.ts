import { BrightPresetColor, PresetColor } from './sequence'

type Color = PresetColor | BrightPresetColor

type RenderAction =
  | {
      action: 'text'
      pos: [row: number, col: number]
      text: string
      color: Color
    }
  | {
      action: 'rect'
      pos: [row: number, col: number]
      size: [width: number, height: number]
      color: Color
    }

export class Compose {
  actions: RenderAction[] = []

  commit(acts: RenderAction[]) {
    this.actions.push(...acts)
  }

  render() {}
}
