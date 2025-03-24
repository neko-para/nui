import cliBoxes from 'cli-boxes'
import { Edge } from 'yoga-layout'

import { sequence } from '..'
import { screen } from './screen'
import { NWidget, NWidgetProp } from './widget'

export type NBoxProp = NWidgetProp & {
  style?:
    | 'single'
    | 'double'
    | 'round'
    | 'bold'
    | 'singleDouble'
    | 'doubleSingle'
    | 'classic'
    | 'arrow'
}

export class NBox extends NWidget {
  constructor() {
    super()

    this.node.setMinWidth(2)
    this.node.setMinHeight(2)
    this.node.setPadding(Edge.All, 1)
  }

  get props() {
    return this._props as NBoxProp
  }

  patchProp(key: string, value: unknown) {
    switch (key) {
      case 'style':
        if (typeof value !== 'string' && value !== undefined) {
          return false
        }
        switch (value) {
          case undefined:
          case 'single':
          case 'double':
          case 'round':
          case 'bold':
          case 'singleDouble':
          case 'doubleSingle':
          case 'classic':
          case 'arrow':
            this.props.style = value
            break
        }

        screen?.scheduleRender()
        break

      default:
        return NWidget.prototype.patchProp.call(this, key, value)
    }

    return true
  }

  draw() {
    NWidget.prototype.draw.call(this)
    sequence.resetColor()

    if (!this.props.style) {
      return
    }

    const style = cliBoxes[this.props.style]

    sequence.move(this.frame[1], this.frame[0])
    process.stdout.write(style.topLeft + style.top.repeat(this.frame[2] - 2) + style.topRight)
    for (let y = 1; y + 1 < this.frame[3]; y++) {
      sequence.move(this.frame[1] + y, this.frame[0])
      process.stdout.write(style.left)
      sequence.move(this.frame[1] + y, this.frame[0] + this.frame[2] - 1)
      process.stdout.write(style.right)
    }
    sequence.move(this.frame[1] + this.frame[3] - 1, this.frame[0])
    process.stdout.write(
      style.bottomLeft + style.bottom.repeat(this.frame[2] - 2) + style.bottomRight
    )
  }
}
