'use strict';

/**
 * Required Packages
 */
const gulp = require('gulp');
const child_process = require('child_process');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const cached = require('gulp-cached');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
// const del = require('del');
// const run = require('gulp-run-command').default;

/**
 * Resources paths
 */
const paths = {

    designSystem: {
        src: './resources/design-system/',
        dest: 'design-system/'
    },

    docs: {
        src: './resources/docs/',
        dest: 'docs/'
    },

}

/**
 * Errors function
 */
const onError = function (err) {
    notify.onError({
        title: "Gulp Error - Compile Failed",
        message: "Error: <%= error.message %>"
    })(err);

    this.emit('end');
};

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

/**
 * Compile Design System CSS
 */
function compileDesignSystemCss() {
    return gulp.src(paths.designSystem.src + 'scss/design-system.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
        .pipe(notify({
            message: 'Compiled design system CSS'
        }));
}

exports.compileDesignSystemCss = compileDesignSystemCss;

/**
 * Minify the CSS
 */
function minifyDesignSystemCss() {
    return gulp.src(paths.designSystem.dest + 'css/design-system.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
        .pipe(notify({
            message: 'Minified design system CSS'
        }));
}

exports.minifyDesignSystemCss = minifyDesignSystemCss;

/**
 * Compile Docs CSS
 */
function compileDocsCss() {
    return gulp.src(paths.docs.src + 'scss/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.docs.dest + 'css/'))
        .pipe(notify({
            message: 'Compiled docs CSS'
        }));
}

exports.compileDocsCss = compileDocsCss;

/**
 * Compile Design System Components Scripts
 */
function compileDesignSystemComponentsJs() {
    return gulp.src(paths.designSystem.src + 'js/components/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(cached('designSystemComponents'))
        .pipe(changed(paths.designSystem.dest + 'js/components/'))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/components/'))
        .pipe(concat('components_all.js'))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled design system components JS'
        }));
}

exports.compileDesignSystemComponentsJs = compileDesignSystemComponentsJs;

/**
 * Minify Design System Components
 */
function minifyDesignSystemComponentsJs() {
    return gulp.src(paths.designSystem.dest + 'js/components_all.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(paths.designSystem.dest + 'js/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Minified design system component JS'
        }));
}

exports.minifyDesignSystemComponentsJs = minifyDesignSystemComponentsJs;

/**
 * Compile Design System Scripts
 */
function compileDesignSystemGlobalJs() {
    return gulp.src(paths.designSystem.src + 'js/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(paths.designSystem.dest + 'js/'))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled design system global JS'
        }));
}

exports.compileDesignSystemGlobalJs = compileDesignSystemGlobalJs;

/**
 * Compile Docs Scripts
 */
function compileDocsJs() {
    return gulp.src(paths.docs.src + 'js/**/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(concat('docs.js'))
        .pipe(gulp.dest(paths.docs.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled Docs JS'
        }));
}

exports.compileDocsJs = compileDocsJs;

const compileJs = gulp.series(
    gulp.parallel(compileDesignSystemComponentsJs, compileDesignSystemGlobalJs, compileDocsJs), 
    minifyDesignSystemComponentsJs
);

exports.compileJs = compileJs;

/**
 * CSS Preflight
 * Unfortunately, it isn't possible to pass in parameters to gulp tasks.
 * As such, we need to replicate the code.
 *
 * Compile CSS [PREFLIGHT]
 */
function compilePreflight() {
    return gulp.src(paths.designSystem.src + 'scss/design-system.scss')
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            purgecss({
                content: [
                    'site/*.njk',
                    'site/_includes/**/*.njk',
                    'site/_layouts/**/*.njk',
                ],
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: ['html', 'njk'],
                    }
                ],
                /**
                 * You can whitelist selectors to stop purgecss from removing them from your CSS.
                 * see: https://www.purgecss.com/whitelisting
                 *
                 * Any selectors defined below will not be stripped from the min.css file.
                 * PurgeCSS will not purge the standard app.css file as this is useful for development.
                 *
                 * @since 1.0.0
                 */
                whitelist: [
                    'body',
                    'html',
                    'h1',
                    'h2',
                    'h3',
                    'p',
                    'blockquote',
                    'intro'
                ],
            })
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
        .pipe(notify({
            message: 'Tailwind Preflight Success'
        }));
}

exports.compilePreflight = compilePreflight;

function watch(done) {
    // gulp.watch(['site/*.njk','site/includes/**/*.njk'], gulp.series(compileDesignSystemCss, minifyDesignSystemCss));
    gulp.watch('./tailwind.config.js', compileDesignSystemCss);
    
    gulp.watch(paths.designSystem.src + 'scss/**/*.scss', compileDesignSystemCss);
    
    gulp.watch(paths.docs.src + 'scss/**/*.scss', compileDocsCss);
    
    gulp.watch(paths.designSystem.src + 'js/**/*.js', gulp.series(gulp.parallel(compileDesignSystemComponentsJs, compileDesignSystemGlobalJs), minifyDesignSystemComponentsJs));

    gulp.watch(paths.docs.src + 'js/**/*.js', compileDocsJs);

    done();
}

function eleventy() {
    const command = 'eleventy --config=eleventy.config.js --serve';
    process.env.ELEVENTY_ENV='development';

    return child_process.spawn(command, {
        stdio: 'inherit',
        shell: true
    });
}

/**
 * Dev task
 * This will run while you're building the theme and automatically compile any changes.
 * This includes any html changes you make so that the purgecss file will be updated.
 */

const dev = gulp.series(gulp.parallel(compilePreflight, compileDocsCss, compileJs), watch, eleventy);

/**
 * Build task
 * Run this once you're happy with your site and you want to prep the files for production.
 * This will run the CSS and Minify Script functions, as well as pass the CSS through purgecss to remove any unused CSS.
 * Always double check that everything is still working. If something isn't displaying correctly, it may be because you need to add it to the purgeCSS whitelist.
 */
const build = gulp.series(gulp.parallel(compilePreflight, compileDocsCss, compileJs), minifyDesignSystemCss);

exports.dev = dev;
exports.build = build;
exports.default = build;
