import { sequence } from '../backend/sequence'
import type { NEvent } from './event'
import { NText } from './text'

export class NInput extends NText {
  pos: number

  constructor() {
    super()

    this.pos = 0
    this.focus()
  }

  afterLayout() {
    const [col, row] = this.posAt(this.pos + 1)
    sequence.move(row, col)
  }

  handle(event: NEvent) {
    if (event.type === 'key') {
      // backspace
      if (event.chunk.length === 1 && event.chunk[0] === 127) {
        if (this.pos > 0) {
          this.updateText(
            this.text.substring(0, this.pos - 1) + this.text.substring(this.pos, this.text.length)
          )
          this.pos = this.pos - 1
        }
      } else if (event.key.startsWith('\x1b[')) {
        const seq = event.key.substring(2)
        switch (seq) {
          // delete
          case '3~':
            if (this.pos < this.text.length) {
              this.updateText(
                this.text.substring(0, this.pos) +
                  this.text.substring(this.pos + 1, this.text.length)
              )
            }
            break
          // up
          case 'A':
            break
          // down
          case 'B':
            break
          // right
          case 'C':
            if (this.pos < this.text.length) {
              this.pos += 1
            }
            break
          // left
          case 'D':
            if (this.pos > 0) {
              this.pos -= 1
            }
            break
        }
      } else {
        if (event.key === '\r') {
          event.key = '\n'
        }
        this.updateText(
          this.text.substring(0, this.pos) +
            event.key +
            this.text.substring(this.pos, this.text.length)
        )
        this.pos = this.pos + event.key.length
      }
      const [col, row] = this.posAt(this.pos + 1)
      sequence.move(row, col)
      event.accept()
    } else {
      NText.prototype.handle.call(this, event)
    }
  }
}
