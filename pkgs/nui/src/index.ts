// import Yoga, { Edge, FlexDirection, PositionType } from 'yoga-layout'
import { FlexDirection } from 'yoga-layout'

import { NLayout } from './base/layout'
import { NScreen } from './base/screen'
import { NText } from './base/text'

// const root = Yoga.Node.create()
// root.setFlexDirection(FlexDirection.Row)
// root.setWidth(100)
// root.setHeight(100)

// const child0 = Yoga.Node.create()
// child0.setFlexGrow(1)
// child0.setMargin(Edge.Right, 10)
// root.insertChild(child0, 0)

// const child1 = Yoga.Node.create()
// child1.setFlexGrow(1)
// root.insertChild(child1, 1)

// root.calculateLayout(undefined, undefined)

// console.log(child0.getComputedLayout(), child1.getComputedLayout())

const rowLayout = new NLayout(FlexDirection.Row)
const text = new NText('Hello world!\nNext Line')
const text2 = new NText('Right text')

const screen = new NScreen()
screen.resize(80, 25)

text.insert(rowLayout)
text2.insert(rowLayout)
rowLayout.insert(screen)

screen.layout()

process.stdout.write(`\x1b[2J`)
screen.render()
process.stdout.write(`\x1b[20;1H`)
