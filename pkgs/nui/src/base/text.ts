import { MeasureMode } from 'yoga-layout'

import { Compose } from '../backend/compose'
import { type KnownColor, sequence } from '../backend/sequence'
import { screen } from './screen'
import { checkColorNullUndefined } from './validate'
import { NWidget, type NWidgetProp } from './widget'

export type NTextProp = NWidgetProp & {
  color?: KnownColor | null
}

export class NText extends NWidget {
  text: string = ''

  constructor(str?: string) {
    super()

    this.text = str ?? ''

    this.node.setMeasureFunc((width, widthMode, height, heightMode) => {
      const rows = this.text.split('\n').map(x => x.length)
      const maxiWidth = rows.reduce((x, y) => Math.max(x, y), 0)
      switch (widthMode) {
        case MeasureMode.Undefined:
          switch (heightMode) {
            case MeasureMode.Undefined:
              return {
                width: maxiWidth,
                height: rows.length
              }
            case MeasureMode.Exactly:
              return {
                width: maxiWidth,
                height: height
              }
            case MeasureMode.AtMost:
              return {
                width: maxiWidth,
                height: Math.min(height, rows.length)
              }
          }
        case MeasureMode.Exactly:
          switch (heightMode) {
            case MeasureMode.Undefined:
              return {
                width: width,
                height: rows.map(row => Math.ceil(row / width)).reduce((x, y) => x + y, 0)
              }
            case MeasureMode.Exactly:
              return {
                width: width,
                height: height
              }
            case MeasureMode.AtMost:
              return {
                width: width,
                height: Math.min(
                  height,
                  rows.map(row => Math.ceil(row / width)).reduce((x, y) => x + y, 0)
                )
              }
          }
        case MeasureMode.AtMost:
          switch (heightMode) {
            case MeasureMode.Undefined:
              if (maxiWidth <= width) {
                return {
                  width: maxiWidth,
                  height: rows.length
                }
              } else {
                return {
                  width: width,
                  height: rows.map(row => Math.ceil(row / width)).reduce((x, y) => x + y, 0)
                }
              }
            case MeasureMode.Exactly:
              return {
                width: Math.min(width, maxiWidth),
                height: height
              }
            case MeasureMode.AtMost:
              if (maxiWidth <= width) {
                return {
                  width: maxiWidth,
                  height: Math.min(height, rows.length)
                }
              } else {
                return {
                  width: width,
                  height: Math.min(
                    height,
                    rows.map(row => Math.ceil(row / width)).reduce((x, y) => x + y, 0)
                  )
                }
              }
          }
      }
    })
  }

  get props() {
    return this._props as NTextProp
  }

  patchProp(key: string, value: unknown) {
    switch (key) {
      case 'color':
        if (!checkColorNullUndefined(value)) {
          return false
        }
        this.props.color = value
        screen?.scheduleRender()
        break

      default:
        return NWidget.prototype.patchProp.call(this, key, value)
    }

    return true
  }

  updateText(str: string) {
    this.text = str

    this.node.markDirty()
    screen?.scheduleLayout()
  }

  draw(compose: Compose) {
    NWidget.prototype.draw.call(this, compose)

    if (!this.text) {
      return
    }

    const rows = this.text.split('\n')
    let row: string | undefined = undefined

    for (let y = 0; y < this.bound[3]; y++) {
      if (row === undefined) {
        row = rows.shift()
      }
      if (row === undefined) {
        break
      }
      const sect = row.substring(0, this.bound[2])
      row = row.substring(this.bound[2])
      if (row.length === 0) {
        row = undefined
      }

      compose.text(this.bound[0], this.bound[1] + y, sect, this.props.color)
    }
  }
}
