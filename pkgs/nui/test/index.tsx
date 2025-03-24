import { ref } from '@vue/runtime-core'

import { NScreen, createApp, sequence } from '..'

const counter = ref(1)

setInterval(() => {
  counter.value += 1
}, 1000)

const Comp = () => {
  return (
    <layout rowGap={2} gap={counter.value} direction="row" wrap="wrap" backgroundFill="_">
      <text grow={1} backgroundFill=" " paddingLeft={5} paddingTop={1}>
        {' '}
        Hello World! {counter.value}
      </text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <box style="single">
        <text grow={1}> Hello World! {counter.value}</text>
      </box>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
      <text grow={1}> Hello World! {counter.value}</text>
    </layout>
  )
}

const screen = new NScreen()
screen.resize(80, 25)

sequence.clear()
const app = createApp(Comp)
app.mount(screen)
// screen.scheduleLayout()
