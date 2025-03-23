import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm'
})
