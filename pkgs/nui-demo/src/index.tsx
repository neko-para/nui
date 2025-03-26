import { NScreen, createApp, defineComponent, input, ref, sequence } from '@nekosu/nui'

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
            <text grow={1} color={'blue'}>
              Item {idx} {counter.value}
            </text>
            <VueComp></VueComp>
          </box>
        )
      })}
    </layout>
  )
}

const [width, height] = await input.querySize()

const screen = new NScreen()
screen.resize(width, height)

sequence.clear()
sequence.move(0, 0)

const app = createApp(Comp)
app.mount(screen)
