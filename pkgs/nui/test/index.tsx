import { defineComponent, ref } from '@vue/runtime-core'

import { NScreen, createApp, sequence } from '..'

const counter = ref(1)

setInterval(() => {
  counter.value += 1
}, 1000)

const VueComp = defineComponent(() => {
  return () => {
    return <text>{counter.value}</text>
  }
})

const Comp = () => {
  return (
    <layout
      rowGap={2}
      gap={counter.value}
      direction="row"
      wrap="wrap"
      backgroundFill=" "
      backgroundColor="bright-white"
    >
      {Array.from({ length: 10 }, (_, idx) => {
        return (
          <box style="single" backgroundFill=" " borderColor="bright-magenta">
            <text grow={1}>
              Item {idx} {counter.value}
            </text>
            <VueComp></VueComp>
          </box>
        )
      })}
    </layout>
  )
}

const screen = new NScreen()
screen.resize(80, 25)

sequence.clear()
const app = createApp(Comp)
app.mount(screen)
// screen.scheduleLayout()
