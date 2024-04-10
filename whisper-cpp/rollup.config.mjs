import typescript from 'rollup-plugin-typescript2'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'

const plugins = [
  typescript(),
  excludeDependenciesFromBundle(),
]

function generateRule(func) {
  const input = `src/functions/${func}.ts`

  return {
    input: input,
    treeshake: false,
    output: [
      {
        file: `dist/${func}.js`,
        format: 'cjs'
      }
    ],
    plugins: plugins,
    external: ['path', 'fs', 'crypto']
  }
}

export default [
  generateRule('transcribe')
]
