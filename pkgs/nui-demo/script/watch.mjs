import { context } from 'esbuild'

context({
  entryPoints: ['src/index.tsx'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm'
}).then(ctx => {
  return ctx.watch()
})
