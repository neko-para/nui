import { context } from 'esbuild'

context({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm',
  external: ['@vue/runtime-core']
}).then(ctx => {
  return ctx.watch()
})
