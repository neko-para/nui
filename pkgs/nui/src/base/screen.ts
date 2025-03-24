import Yoga, { type Node } from 'yoga-layout'

import { NWidget } from './widget'

export let screen: NScreen | null = null

export class NScreen extends NWidget {
  needsLayout: boolean = false
  needsRender: boolean = false

  constructor() {
    super()

    screen = this
  }

  resize(width: number, height: number) {
    this.node.setWidth(width)
    this.node.setHeight(height)
  }

  layout() {
    this.needsLayout = false
    if (!this.node.hasNewLayout()) {
      return
    }

    this.node.markLayoutSeen()

    this.node.calculateLayout(undefined, undefined)

    const { left, top, width, height } = this.node.getComputedLayout()
    this.frame = [left, top, width, height]

    for (const child of this.childs) {
      child.layout()
    }

    this.scheduleRender()
  }

  render() {
    this.needsRender = false
    NWidget.prototype.render.call(this)

    if (this.needsRender) {
      this.scheduleRender()
    }
  }

  scheduleLayout() {
    if (!this.needsLayout) {
      this.needsLayout = true
      setImmediate(() => {
        this.layout()
      })
    }
  }

  scheduleRender() {
    if (!this.needsRender) {
      this.needsRender = true
      setImmediate(() => {
        this.render()
      })
    }
  }
}
