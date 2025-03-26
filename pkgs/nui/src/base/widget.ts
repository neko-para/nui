import { env } from 'process'
import Yoga, { Align, Display, Edge, type Node, PositionType } from 'yoga-layout'

import { Compose } from '../backend/compose'
import { type KnownColor, sequence } from '../backend/sequence'
import type { NEvent } from './event'
import { screen } from './screen'
import { checkColorNullUndefined, checkNumberPercUndefined } from './validate'

const yogaCleaner = new FinalizationRegistry((node: Node) => {
  node.free()
})

export type NWidgetProp = {
  backgroundFill?: string
  backgroundColor?: KnownColor | null
}

export class NWidget {
  node: Node

  parent: NWidget | null = null
  childs: NWidget[] = []

  // with padding
  frame: [x: number, y: number, w: number, h: number] = [0, 0, 0, 0]
  // without padding
  bound: [x: number, y: number, w: number, h: number] = [0, 0, 0, 0]
  _props: NWidgetProp = {}

  constructor() {
    this.node = Yoga.Node.create()
    yogaCleaner.register(this, this.node)
  }

  get props() {
    return this._props
  }

  patchProp(key: string, value: unknown) {
    switch (key) {
      case 'display':
        if (typeof value !== 'string' && value !== undefined) {
          return false
        }
        switch (value) {
          case undefined:
          case 'flex':
            this.node.setDisplay(Display.Flex)
            break
          case 'none':
            this.node.setDisplay(Display.None)
            break
          default:
            return false
        }
        break

      case 'width':
        if (value === 'auto') {
          this.node.setWidthAuto()
        } else if (checkNumberPercUndefined(value)) {
          this.node.setWidth(value)
        } else {
          return false
        }
        break

      case 'height':
        if (value === 'auto') {
          this.node.setHeightAuto()
        } else if (checkNumberPercUndefined(value)) {
          this.node.setHeight(value)
        } else {
          return false
        }
        break

      case 'minWidth':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setMinWidth(value)
        break

      case 'maxWidth':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setMaxWidth(value)
        break

      case 'minHeight':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setMinHeight(value)
        break

      case 'maxHeight':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setMaxHeight(value)
        break

      case 'margin':
        if (value === 'auto') {
          this.node.setMarginAuto(Edge.All)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setMargin(Edge.All, value)
        } else {
          return false
        }
        break

      case 'marginLeft':
        if (value === 'auto') {
          this.node.setMarginAuto(Edge.Left)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setMargin(Edge.Left, value)
        } else {
          return false
        }
        break

      case 'marginRight':
        if (value === 'auto') {
          this.node.setMarginAuto(Edge.Right)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setMargin(Edge.Right, value)
        } else {
          return false
        }
        break

      case 'marginTop':
        if (value === 'auto') {
          this.node.setMarginAuto(Edge.Top)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setMargin(Edge.Top, value)
        } else {
          return false
        }
        break

      case 'marginBottom':
        if (value === 'auto') {
          this.node.setMarginAuto(Edge.Bottom)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setMargin(Edge.Bottom, value)
        } else {
          return false
        }
        break

      case 'padding':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setPadding(Edge.All, value)
        break

      case 'paddingLeft':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setPadding(Edge.Left, value)
        break

      case 'paddingRight':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setPadding(Edge.Right, value)
        break

      case 'paddingTop':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setPadding(Edge.Top, value)
        break

      case 'paddingBottom':
        if (!checkNumberPercUndefined(value)) {
          return false
        }
        this.node.setPadding(Edge.Bottom, value)
        break

      case 'position':
        if (typeof value !== 'string' && value !== undefined) {
          return false
        }
        switch (value) {
          case undefined:
          case 'relative':
            this.node.setPositionType(PositionType.Relative)
            break
          case 'absolute':
            this.node.setPositionType(PositionType.Absolute)
            break
          case 'static':
            this.node.setPositionType(PositionType.Static)
            break
          default:
            return false
        }
        break

      case 'left':
        if (value === 'auto') {
          this.node.setPositionAuto(Edge.Left)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setPosition(Edge.Left, value)
        } else {
          return false
        }
        break

      case 'right':
        if (value === 'auto') {
          this.node.setPositionAuto(Edge.Right)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setPosition(Edge.Right, value)
        } else {
          return false
        }
        break

      case 'top':
        if (value === 'auto') {
          this.node.setPositionAuto(Edge.Top)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setPosition(Edge.Top, value)
        } else {
          return false
        }
        break

      case 'bottom':
        if (value === 'auto') {
          this.node.setPositionAuto(Edge.Bottom)
        } else if (checkNumberPercUndefined(value)) {
          this.node.setPosition(Edge.Bottom, value)
        } else {
          return false
        }
        break

      case 'alignSelf':
        if (typeof value !== 'string' && value !== undefined) {
          return false
        }
        switch (value) {
          case undefined:
          case 'stretch':
            this.node.setAlignSelf(Align.Stretch)
            break
          case 'flex-start':
            this.node.setAlignSelf(Align.FlexStart)
            break
          case 'flex-end':
            this.node.setAlignSelf(Align.FlexEnd)
            break
          case 'center':
            this.node.setAlignSelf(Align.Center)
            break
          case 'baseline':
            this.node.setAlignSelf(Align.Baseline)
            break
          default:
            return false
        }
        break

      case 'basis':
        if (value === 'auto') {
          this.node.setFlexBasisAuto()
        } else if (checkNumberPercUndefined(value)) {
          this.node.setFlexBasis(value)
        } else {
          return false
        }
        break

      case 'grow':
        if (typeof value !== 'number' && value !== undefined) {
          return false
        }
        this.node.setFlexGrow(value)
        break

      case 'shrink':
        if (typeof value !== 'number' && value !== undefined) {
          return false
        }
        this.node.setFlexShrink(value)
        break

      case 'aspectRatio':
        if (typeof value !== 'number' && value !== undefined) {
          return false
        }
        this.node.setAspectRatio(value)
        break

      case 'backgroundFill':
        if (value === undefined || (typeof value === 'string' && value.length === 1)) {
          this.props.backgroundFill = value
          screen?.scheduleRender()
          break
        }
        return false

      case 'backgroundColor':
        if (!checkColorNullUndefined(value)) {
          return false
        }
        this.props.backgroundColor = value
        screen?.scheduleRender()
        break

      default:
        return false
    }

    return true
  }

  insert(target: NWidget, anchor?: NWidget | null) {
    if (anchor) {
      const idx = target.childs.indexOf(anchor)
      if (idx === -1) {
        throw 'Anchor not in target'
      }
    }
    this.remove()
    const idx = anchor ? target.childs.indexOf(anchor) : target.childs.length
    target.childs.splice(idx, 0, this)
    this.parent = target
    target.node.insertChild(this.node, idx)

    screen?.scheduleLayout()
  }

  remove() {
    if (this.parent) {
      const idx = this.parent.childs.indexOf(this)
      if (idx === -1) {
        throw 'Parent not containing this'
      }

      this.parent.childs.splice(idx, 1)
      this.parent.node.removeChild(this.node)

      screen?.scheduleLayout()
    }
  }

  afterLayout() {}

  layout() {
    if (!this.node.hasNewLayout()) {
      return
    }

    this.node.markLayoutSeen()

    const { left, top, width, height } = this.node.getComputedLayout()
    const [x, y] = this.parent?.frame ?? [0, 0]
    this.frame = [left + x, top + y, width, height]

    const pleft = this.node.getComputedPadding(Edge.Left)
    const pright = this.node.getComputedPadding(Edge.Right)
    const ptop = this.node.getComputedPadding(Edge.Top)
    const pbottom = this.node.getComputedPadding(Edge.Bottom)

    this.bound = [
      this.frame[0] + pleft,
      this.frame[1] + ptop,
      this.frame[2] - pleft - pright,
      this.frame[3] - ptop - pbottom
    ]

    for (const child of this.childs) {
      child.layout()
    }

    this.afterLayout()
  }

  draw(compose: Compose) {
    if (this.props.backgroundFill) {
      compose.fillText(...this.frame, this.props.backgroundFill)
    }
    if (this.props.backgroundColor) {
      compose.rect(...this.frame, this.props.backgroundColor)
    }
  }

  render(compose: Compose) {
    if (this.node.getDisplay() === Display.None) {
      return
    }

    this.draw(compose)

    for (const child of this.childs) {
      child.render(compose)
    }
  }

  focus() {
    if (screen) {
      screen.focusWidget = this
    }
  }

  handle(event: NEvent) {
    event.ignore()
  }

  dispatchEvent(event: NEvent): boolean {
    event.accepted = true
    this.handle(event)
    if (event.accepted) {
      return true
    } else {
      return this.parent?.dispatchEvent(event) ?? false
    }
  }
}
