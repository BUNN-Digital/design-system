const postcssImport = require('postcss-import')
const tailwindcss = require('tailwindcss')
const postcssNested = require('postcss-nested')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssNested(),
    postcssImport(),
    // postcssPresetEnv({ stage: 3 }),
    tailwindcss(),
  ]
}

// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': 'postcss-nesting',
//     tailwindcss: {},
//     autoprefixer: {},
//   }
// }

// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': 'postcss-nesting',
//     tailwindcss: {},
//     'postcss-preset-env': {
//       stage: 3,
//       features: { 'nesting-rules': false },
//     },
//   }
// }
