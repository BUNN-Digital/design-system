# BUNN Design System

Design system for BUNN Digital, powered by Eleventy.

## Requirements

* Node `>=` v8.9.0
* Gulp 4

## Installation

```
npm install
```

`cd` into your project folder and `npm run dev` which will start the Eleventy development server and Gulp. Eleventy has browser hot reloading baked in and will watch all files for changes.


## Folder Structure

The `site` folder contains all the templates, pages and content which Eleventy will watch and compile into HTML for us.

A `globals` folder lives within this, where as the name suggests - globally available files live. There's a `site.json` file for general site stuff (name, author, email etc), `navigation.json` which we use as reference to loop over in our template to generate our nav and a `helpers.js` which just contains an environment helper.

Uncompiled SCSS and JS reside in the `resources` folder - Gulp will be watching these folders for any changes (you should restart the server when creating new partials).

When in development mode, Elventy will use `main.css` as the stylesheet. This will be pretty chunky in filesize, due to it containing all of Tailwind's utility classes. Once you run the build command ready for deployment, Eleventy will then reference the minified version of the stylesheet `main.min.css`.

## Ready to deploy?

`npm run build` to minify scripts and run Purgecss over your styles.

Purge will also run via the build command and will cross reference all of Tailwind's utility classes with your templates/HTML and will remove all the unused ones - pretty cool right?
