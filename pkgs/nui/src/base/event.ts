type NEventData = {
  type: 'key'
  chunk: Buffer
  key: string
}

export type NEvent = {
  accepted: boolean

  accept(): void
  ignore(): void
} & NEventData

export function makeEvent(data: NEventData): NEvent {
  const ev: NEvent = {
    ...data,

    accepted: true,
    accept: () => {
      ev.accepted = true
    },
    ignore: () => {
      ev.accepted = false
    }
  }
  return ev
}
