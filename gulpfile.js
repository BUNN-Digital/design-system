'use strict';

/**
 * Required Packages
 */
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    run = require('gulp-run-command').default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    tailwindcss = require('tailwindcss'),
    purgecss = require('@fullhuman/postcss-purgecss');

/**
 * Resources paths
 */
var paths = {

    sass: {
        main: './resources/sass/main.scss',
        docs: './resources/sass/docs/**/*.scss',
        dest: 'css/'
    },

    javascript: {
        docs: './resources/js/docs/**/*.js',
        designSystem: './resources/js/design-system/*.js',
        designSystemComponents: './resources/js/design-system/components/*.js',
        docsDest: 'javascript/docs/',
        designSystemDest: 'javascript/design-system/',
        designSystemComponentsDest: 'javascript/design-system/components/',
    }

}

/**
 * Errors function
 */
var onError = function (err) {
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
 * Compile Tailwind
 */
function compileDesignSystemCss() {
    return gulp.src(paths.sass.main)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(notify({
            message: 'Components - Compile Success'
        }));
}

/**
 * Compile Other CSS
 */
function compileDocsCss() {
    return gulp.src(paths.sass.docs)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(notify({
            message: 'Docs CSS - Compile Success'
        }));
}

/**
 * Minify the CSS
 */
function minifyDesignSystemCss() {
    return gulp.src([
        './css/main.css',
        '!./css/*.min.css'
        ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'CSS - Minify Success'
        }));
}

/**
 * Compile Docs Scripts
 */
function compileDocsJs() {
    return gulp.src(paths.javascript.docs)
        .pipe(cached('docsjs'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(concat('docs.js'))
        .pipe(gulp.dest(paths.javascript.docsDest))
        .pipe(notify({
            message: 'Docs Javascript - Compile Success'
        }));
}

/**
 * Compile Design System Scripts
 */
function compileDesignSystemJs() {
    return gulp.src(paths.javascript.designSystem)
        .pipe(cached('dsJs'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.javascript.designSystemDest))
        .pipe(notify({
            message: 'Design System Javascript - Compile Success'
        }));
}

/**
 * Compile Design System Components Scripts
 */
function compileDesignSystemComponentsJs() {
    return gulp.src(paths.javascript.designSystemComponents)
        .pipe(cached('componentsJs'))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.javascript.designSystemComponentsDest))
        .pipe(concat('components.js'))
        .pipe(gulp.dest(paths.javascript.designSystemDest))
        .pipe(notify({
            message: 'Design System Components Javascript - Compile Success'
        }));
}

/**
 * Minify Design System Components
 */
function minifyDesignSystemComponentsJs() {
    return gulp.src(paths.javascript.designSystemDest + 'components.js')
        .pipe(cached('componentsMinifier'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.javascript.designSystemDest))
        .pipe(notify({
            message: 'Javascript - Minify Success'
        }));
}

var compileJs = gulp.series(
    gulp.parallel(
        compileDocsJs, 
        compileDesignSystemJs, 
        compileDesignSystemComponentsJs
    ), 
    minifyDesignSystemComponentsJs
);

gulp.task('js', compileJs);


/**
 * CSS Preflight
 * Unfortunately, it isn't possible to pass in parameters to gulp tasks.
 * As such, we need to replicate the code.
 *
 * Compile CSS [PREFLIGHT]
 */
function compilePreflight() {
    return gulp.src(paths.sass.main)
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
        .pipe(gulp.dest('css/'))
        .pipe(notify({
            message: 'Tailwind Preflight Success'
        }));
}

/**
 * Minify the CSS [PREFLIGHT]
 */
function minifyPreflight() {
    return gulp.src([
        './css/main.css',
        '!./css/main.min.css'
        ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'CSS Preflight Success'
        }));
}

function watch(done) {
    var templateWatcher = gulp.watch(['site/*.njk','site/includes/**/*.njk']);
    var tailwindWatcher = gulp.watch('./tailwind.config.js');
    var sassWatcher = gulp.watch([
        './resources/sass/**/*.scss',
        '!./resources/sass/docs/'
    ]);
    var docsSassWatcher = gulp.watch('./resources/sass/docs/**/*.scss');
    
    var docsJsWatcher = gulp.watch('./resources/js/docs/**/*.js');
    var docsDesignSystemWatcher = gulp.watch('./resources/js/design-system/**/*.js');

    // templateWatcher.on('change', gulp.series(compileDesignSystemCss, minifyDesignSystemCss));
    tailwindWatcher.on('change', compileDesignSystemCss);
    sassWatcher.on('change', compileDesignSystemCss);
    docsSassWatcher.on('change', compileDocsCss);
    docsJsWatcher.on('change', compileJs);
    docsDesignSystemWatcher.on('change', compileJs);

    done();
}

function eleventy() {
    var command = 'eleventy --config=eleventy.config.js --serve';
    process.env.ELEVENTY_ENV='development';

    var child = spawn(command, {
        stdio: 'inherit',
        shell: true
    });
}

/**
 * Default Gulp task
 */
gulp.task('default', 
    gulp.parallel(
        compileJs,
        gulp.series(compilePreflight, minifyPreflight, minifyDesignSystemCss),
        compileDocsCss
    )
);

/**
 * Dev task
 * This will run while you're building the theme and automatically compile any changes.
 * This includes any html changes you make so that the purgecss file will be updated.
 */

gulp.task('dev', 
    gulp.series(
        gulp.parallel(compileJs, compileDesignSystemCss, compileDocsCss), watch, eleventy
    )
);

/**
 * Build task
 * Run this once you're happy with your site and you want to prep the files for production.
 * This will run the CSS and Minify Script functions, as well as pass the CSS through purgecss to remove any unused CSS.
 * Always double check that everything is still working. If something isn't displaying correctly, it may be because you need to add it to the purgeCSS whitelist.
 */
gulp.task('build', 
    gulp.parallel(
        gulp.series(compileJs),
        gulp.series(compilePreflight, compileDesignSystemCss, minifyPreflight, minifyDesignSystemCss),
        compileDocsCss
    )
);
