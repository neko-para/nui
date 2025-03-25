import { type KnownColor, sequence } from './sequence'

type RenderAction =
  | {
      action: 'text'
      pos: [row: number, col: number]
      count: number
      text: string
      color?: KnownColor | null
    }
  | {
      action: 'fill'
      pos: [row: number, col: number]
      count: number
      color: KnownColor | null
    }

type Attr = {
  ch?: string
  fg?: KnownColor
  bg?: KnownColor
}

export class Compose {
  actions: RenderAction[] = []

  commit(...acts: RenderAction[]) {
    this.actions.push(...acts)
  }

  text(col: number, row: number, text: string, color?: KnownColor | null) {
    this.commit({
      action: 'text',
      pos: [row, col],
      count: text.length,
      text,
      color
    })
  }

  fillText(
    col: number,
    row: number,
    width: number,
    height: number,
    text: string,
    color?: KnownColor | null
  ) {
    this.commit(
      ...Array.from(
        { length: height },
        (_, idx) =>
          ({
            action: 'text',
            pos: [row + idx, col],
            count: width,
            text: text.repeat(width),
            color
          }) satisfies RenderAction
      )
    )
  }

  rect(col: number, row: number, width: number, height: number, color: KnownColor | null) {
    this.commit(
      ...Array.from(
        { length: height },
        (_, idx) =>
          ({
            action: 'fill',
            pos: [row + idx, col],
            count: width,
            color
          }) satisfies RenderAction
      )
    )
  }

  render() {
    let result = sequence.resetColorSeq() + sequence.clearSeq()

    const rows = new Set<number>()
    for (const act of this.actions) {
      rows.add(act.pos[0])
    }
    for (const row of rows) {
      const acts = this.actions.filter(act => act.pos[0] == row)
      const left = acts.map(act => act.pos[1]).reduce((a, b) => Math.min(a, b), acts[0].pos[1])
      const right = acts
        .map(act => act.pos[1] + act.count)
        .reduce((a, b) => Math.max(a, b), acts[0].pos[1] + acts[0].count)
      const attrs: Attr[] = Array.from({ length: right - left }, () => ({}))
      for (const act of acts) {
        switch (act.action) {
          case 'text':
            for (let i = 0; i < act.count; i++) {
              const attr = attrs[i + act.pos[1]]
              attr.ch = act.text[i] ?? ' '
              if (act.color !== undefined) {
                attr.fg = act.color ?? undefined
              }
            }
            break
          case 'fill':
            for (let i = 0; i < act.count; i++) {
              const attr = attrs[i + act.pos[1]]
              attr.bg = act.color ?? undefined
            }
            break
        }
      }
      let curr: Attr = {}
      result += sequence.moveSeq(row, left)
      for (const attr of attrs) {
        let clear: boolean
        let changeFg: boolean
        let changeBg: boolean
        if (attr.fg !== curr.fg && attr.bg !== curr.bg) {
          clear = !attr.fg || !attr.bg
          changeFg = !!attr.fg
          changeBg = !!attr.bg
        } else if (!attr.fg || !attr.bg) {
          clear = true
          changeFg = !!attr.fg
          changeBg = !!attr.bg
        } else {
          clear = false
          changeFg = attr.fg !== curr.fg
          changeBg = attr.bg !== curr.bg
        }
        curr = attr
        if (clear) {
          result += sequence.resetColorSeq()
        }
        if (changeFg) {
          result += sequence.presetForegroundSeq(attr.fg!)
        }
        if (changeBg) {
          result += sequence.presetBackgroundSeq(attr.bg!)
        }
        result += attr.ch ?? ' '
      }
    }

    process.stdout.write(result)
  }
}
