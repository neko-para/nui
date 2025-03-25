import { build } from 'esbuild'

build({
  entryPoints: ['src/index.tsx'],
  platform: 'node',
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  format: 'esm',
  minify: true
})
