import { FlexDirection, Gutter } from 'yoga-layout'

import { NWidget } from './widget'

export class NLayout extends NWidget {
  constructor(direction: FlexDirection) {
    super()

    this.node.setFlexDirection(direction)
    this.node.setFlexGrow(1)
    this.node.setGap(Gutter.All, 5)
  }
}
