export const sequence = {
  clear() {
    process.stdout.write(`\x1b[2J`)
  },
  move(row: number, col: number) {
    process.stdout.write(`\x1b[${row + 1};${col + 1}H`)
  }
}
