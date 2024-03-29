const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = eleventyConfig => {
  // Add syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight)

  // Add a readable date formatter filter to Nunjucks
  eleventyConfig.addFilter('dateDisplay', require('./filters/dates.js'))

  // Add a HTML timestamp formatter filter to Nunjucks
  eleventyConfig.addFilter('htmlDateDisplay', require('./filters/timestamp.js'))

  // Collections
  eleventyConfig.addCollection('brandSorted', collection => {
    return collection.getFilteredByTag('brand').sort((a, b) => {
      if (a.data.title > b.data.title) return -1
      else if (a.data.title < b.data.title) return 1
      else return 0
    }).reverse()
  })

  eleventyConfig.addCollection('componentsSorted', collection => {
    return collection.getFilteredByTag('components').sort((a, b) => {
      if (a.data.title > b.data.title) return -1
      else if (a.data.title < b.data.title) return 1
      else return 0
    }).reverse()
  })

  eleventyConfig.addCollection('modules', collection => {
    return collection.getFilteredByTag('modules')
  })

  eleventyConfig.addCollection('utilities', collection => {
    return collection.getFilteredByTag('utilities')
  })

  // Include our static assets
  eleventyConfig.addPassthroughCopy('design-system/')
  eleventyConfig.addPassthroughCopy('docs/')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')

  return {
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,

    dir: {
      input: 'site',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts',
      data: '_globals'
    }
  }
}
