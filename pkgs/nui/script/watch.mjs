import { context } from 'esbuild'

context({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm'
}).then(ctx => {
  return ctx.watch()
})
