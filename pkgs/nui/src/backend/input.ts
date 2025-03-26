import { sequence } from './sequence'

class Input {
  _raw: boolean = false
  queryResp: (resp: string) => void = () => void 0

  constructor() {
    this.raw = true
    process.stdin.on('data', chunk => {
      // ^A ~ ^Z
      if (chunk.length === 1 && chunk[0] >= 1 && chunk[0] <= 26) {
        // ^C
        if (chunk[0] === 3) {
          process.exit(0)
        }
      } else {
        this.proc(chunk.toString())
      }
    })
  }

  set raw(value: boolean) {
    this._raw = value
    process.stdin.setRawMode(value)
  }

  get raw() {
    return this._raw
  }

  proc(data: string) {
    if (data.startsWith('\x1b[') && data.endsWith('R')) {
      const rsp = this.queryResp
      this.queryResp = () => void 0
      rsp(data.substring(2, data.length - 1))
    }
  }

  query(seq: string) {
    const pro = new Promise<string>(resolve => {
      this.queryResp = resolve
    })
    process.stdout.write(seq)
    return pro
  }

  async queryCursor() {
    const result = await this.query(`\x1b[6n`)
    const pos = result.split(';').map(x => parseInt(x))
    const row = (pos[0] ?? 1) - 1
    const col = (pos[1] ?? 1) - 1
    return [col, row] as [x: number, y: number]
  }

  async querySize() {
    sequence.move(999, 999)
    const [col, row] = await this.queryCursor()
    return [col + 1, row + 1] as [width: number, height: number]
  }
}

export const input = new Input()
