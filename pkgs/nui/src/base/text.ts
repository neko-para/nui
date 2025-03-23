import { MeasureMode } from 'yoga-layout'

import { NWidget } from './widget'

export class NText extends NWidget {
  text: string

  constructor(text: string) {
    super()
    this.text = text

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

  draw() {
    const rows = this.text.split('\n')
    let row: string | undefined = undefined

    for (let y = 0; y < this.frame[3]; y++) {
      if (row === undefined) {
        row = rows.shift()
      }
      if (row === undefined) {
        break
      }
      const sect = row.substring(0, this.frame[2])
      row = row.substring(this.frame[2])
      if (row.length === 0) {
        row = undefined
      }

      process.stdout.write(`\x1b[${1 + this.frame[1] + y};${1 + this.frame[0]}H`)
      process.stdout.write(sect)
    }
  }
}
