import { build } from 'esbuild'

build({
  entryPoints: ['test/index.tsx'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm'
})
