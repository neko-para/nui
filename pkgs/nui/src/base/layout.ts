import { Align, FlexDirection, Gutter, Justify, Wrap } from 'yoga-layout'

import { screen } from './screen'
import { checkNumberPercUndefined } from './validate'
import { NWidget } from './widget'

export class NLayout extends NWidget {
  constructor() {
    super()
  }

  patchProp(key: string, value: unknown) {
    switch (key) {
      case 'direction':
        if (typeof value !== 'string' && typeof value !== 'undefined') {
          return false
        }
        switch (value) {
          case undefined:
          case 'column':
            this.node.setFlexDirection(FlexDirection.Column)
            break
          case 'row':
            this.node.setFlexDirection(FlexDirection.Row)
            break
          case 'column-reverse':
            this.node.setFlexDirection(FlexDirection.ColumnReverse)
            break
          case 'row-reverse':
            this.node.setFlexDirection(FlexDirection.RowReverse)
            break
          default:
            return false
        }
        break

      case 'wrap':
        if (typeof value !== 'string' && typeof value !== 'undefined') {
          return false
        }
        switch (value) {
          case undefined:
          case 'no-wrap':
            this.node.setFlexWrap(Wrap.NoWrap)
            break
          case 'wrap':
            this.node.setFlexWrap(Wrap.Wrap)
            break
          case 'wrap-reverse':
            this.node.setFlexWrap(Wrap.WrapReverse)
            break
          default:
            return false
        }
        break

      case 'gap':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setGap(Gutter.All, value)
        break

      case 'rowGap':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setGap(Gutter.Row, value)
        break

      case 'columnGap':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setGap(Gutter.Column, value)
        break

      case 'justifyContent':
        if (typeof value !== 'string' && typeof value !== 'undefined') {
          return false
        }
        switch (value) {
          case undefined:
          case 'flex-start':
            this.node.setJustifyContent(Justify.FlexStart)
            break
          case 'flex-end':
            this.node.setJustifyContent(Justify.FlexEnd)
            break
          case 'center':
            this.node.setJustifyContent(Justify.Center)
            break
          case 'space-between':
            this.node.setJustifyContent(Justify.SpaceBetween)
            break
          case 'space-around':
            this.node.setJustifyContent(Justify.SpaceAround)
            break
          case 'space-evenly':
            this.node.setJustifyContent(Justify.SpaceEvenly)
            break
          default:
            return false
        }
        break

      case 'alignItems':
        if (typeof value !== 'string' && typeof value !== 'undefined') {
          return false
        }
        switch (value) {
          case undefined:
          case 'stretch':
            this.node.setAlignItems(Align.Stretch)
            break
          case 'flex-start':
            this.node.setAlignItems(Align.FlexStart)
            break
          case 'flex-end':
            this.node.setAlignItems(Align.FlexEnd)
            break
          case 'center':
            this.node.setAlignItems(Align.Center)
            break
          case 'baseline':
            this.node.setAlignItems(Align.Baseline)
            break
          default:
            return false
        }
        break

      case 'alignContent':
        if (typeof value !== 'string' && typeof value !== 'undefined') {
          return false
        }
        switch (value) {
          case undefined:
          case 'flex-start':
            this.node.setAlignContent(Align.FlexStart)
            break
          case 'flex-end':
            this.node.setAlignContent(Align.FlexEnd)
            break
          case 'stretch':
            this.node.setAlignContent(Align.Stretch)
            break
          case 'center':
            this.node.setAlignContent(Align.Center)
            break
          case 'space-between':
            this.node.setAlignContent(Align.SpaceBetween)
            break
          case 'space-around':
            this.node.setAlignContent(Align.SpaceAround)
            break
          case 'space-evenly':
            this.node.setAlignContent(Align.SpaceEvenly)
            break
          default:
            return false
        }
        break

      default:
        return NWidget.prototype.patchProp.call(this, key, value)
    }

    return true
  }
}
