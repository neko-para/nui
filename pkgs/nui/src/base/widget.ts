import Yoga, { type Node } from 'yoga-layout'

const yogaCleaner = new FinalizationRegistry((node: Node) => {
  node.free()
})

export class NWidget {
  node: Node

  parent: NWidget | null = null
  childs: NWidget[] = []

  frame: [x: number, y: number, w: number, h: number] = [0, 0, 0, 0]

  constructor() {
    this.node = Yoga.Node.create()
    yogaCleaner.register(this, this.node)
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
    target.node.insertChild(this.node, idx)
  }

  remove() {
    if (this.parent) {
      const idx = this.parent.childs.indexOf(this)
      if (idx === -1) {
        throw 'Parent not containing this'
      }

      this.parent.childs.splice(idx, 1)
      this.parent.node.removeChild(this.node)
    }
  }

  layout() {
    if (!this.node.hasNewLayout()) {
      return
    }

    const { left, top, width, height } = this.node.getComputedLayout()
    this.frame = [left, top, width, height]

    for (const child of this.childs) {
      child.layout()
    }
  }

  draw() {}

  render() {
    this.draw()

    for (const child of this.childs) {
      child.render()
    }
  }
}
