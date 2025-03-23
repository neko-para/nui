import Yoga, { type Node } from 'yoga-layout'

import { NWidget } from './widget'

export class NScreen extends NWidget {
  constructor() {
    super()
  }

  resize(width: number, height: number) {
    this.node.setWidth(width)
    this.node.setHeight(height)
  }

  layout() {
    if (!this.node.hasNewLayout()) {
      return
    }

    this.node.calculateLayout(undefined, undefined)

    const { left, top, width, height } = this.node.getComputedLayout()
    this.frame = [left, top, width, height]

    for (const child of this.childs) {
      child.layout()
    }
  }
}
