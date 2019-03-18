const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = eleventyConfig => {

    // Add syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

    // Collections
    eleventyConfig.addCollection('brand', collection => {
        return collection.getFilteredByTag('brand').reverse()
    })

    eleventyConfig.addCollection('principles', collection => {
        return collection.getFilteredByTag('principles').reverse()
    })

    eleventyConfig.addCollection('components', collection => {
        return collection.getFilteredByTag('components').reverse()
    })

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("javascript")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("fonts")

    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    }

}
