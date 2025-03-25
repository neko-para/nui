import cliBoxes from 'cli-boxes'
import { Edge } from 'yoga-layout'

import { Compose } from '../backend/compose'
import { type KnownColor, sequence } from '../backend/sequence'
import { screen } from './screen'
import { checkColorNullUndefined } from './validate'
import { NWidget, type NWidgetProp } from './widget'

export type NBoxProp = NWidgetProp & {
  borderColor?: KnownColor | null
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
      case 'borderColor':
        if (!checkColorNullUndefined(value)) {
          return false
        }
        this.props.borderColor = value
        screen?.scheduleRender()
        break

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

  draw(compose: Compose) {
    NWidget.prototype.draw.call(this, compose)

    if (!this.props.style) {
      return
    }

    const style = cliBoxes[this.props.style]

    compose.text(
      this.frame[0],
      this.frame[1],
      style.topLeft + style.top.repeat(this.frame[2] - 2) + style.topRight,
      this.props.borderColor
    )
    for (let y = 1; y + 1 < this.frame[3]; y++) {
      compose.text(this.frame[0], this.frame[1] + y, style.left, this.props.borderColor)
      compose.text(
        this.frame[0] + this.frame[2] - 1,
        this.frame[1] + y,
        style.right,
        this.props.borderColor
      )
    }
    compose.text(
      this.frame[0],
      this.frame[1] + this.frame[3] - 1,
      style.bottomLeft + style.bottom.repeat(this.frame[2] - 2) + style.bottomRight,
      this.props.borderColor
    )
  }
}
