const postcssImport = require('postcss-import')
const tailwindcss = require('tailwindcss')
const postcssNested = require('postcss-nested')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    postcssNested(),
    postcssPresetEnv({ stage: 3 })
  ]
}
