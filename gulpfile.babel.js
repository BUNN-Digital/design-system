/**
 * Required Packages
 */
import gulp from 'gulp';
import child_process from 'child_process';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import cached from 'gulp-cached';
import cleanCSS from 'gulp-clean-css';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import tailwindcss from 'tailwindcss';
import purgecss from '@fullhuman/postcss-purgecss';
// import del from 'del';
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
const compileDesignSystemCss = () => {
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

/**
 * Minify the CSS
 */
const minifyDesignSystemCss = () => {
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

/**
 * Compile Docs CSS
 */
const compileDocsCss = () => {
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

/**
 * Compile Design System Components Scripts
 */
const compileDesignSystemComponentsJs = () => {
    return gulp.src(paths.designSystem.src + 'js/components/*.js')
        .pipe(plumber({ errorHandler: onError }))
        // .pipe(cached('designSystemComponents'))
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

/**
 * Minify Design System Components
 */
const minifyDesignSystemComponentsJs = () => {
    return gulp.src(paths.designSystem.dest + 'js/components_all.js')
        .pipe(plumber({ errorHandler: onError }))
        // .pipe(cached('designSystemComponentsMinifiedJs'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Minified design system component JS'
        }));
}

/**
 * Compile Design System Scripts
 */
const compileDesignSystemGlobalJs = () => {
    return gulp.src(paths.designSystem.src + 'js/*.js')
        .pipe(plumber({ errorHandler: onError }))
        // .pipe(cached('designSystemGlobalJs'))
        .pipe(babel({
            presets: ['@babel/env'],
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled design system global JS'
        }));
}

/**
 * Compile Docs Scripts
 */
const compileDocsJs = () => {
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

const compileJs = gulp.series(
    gulp.parallel(compileDesignSystemComponentsJs, compileDesignSystemGlobalJs, compileDocsJs), 
    minifyDesignSystemComponentsJs
);

const watch = (done) => {
    gulp.watch('./tailwind.config.js', compileDesignSystemCss);
    
    gulp.watch(paths.designSystem.src + 'scss/**/*.scss', compileDesignSystemCss);
    
    gulp.watch(paths.docs.src + 'scss/**/*.scss', compileDocsCss);
    
    gulp.watch(paths.designSystem.src + 'js/**/*.js', gulp.series(compileJs, minifyDesignSystemComponentsJs));

    gulp.watch(paths.docs.src + 'js/**/*.js', compileDocsJs);

    done();
}

const eleventy = () => {
    const command = 'eleventy --config=eleventy.config.js --serve';
    process.env.ELEVENTY_ENV='development';

    return child_process.spawn(command, {
        stdio: 'inherit',
        shell: true
    });
}


export {
    compileDesignSystemComponentsJs
}


export const dev = gulp.series(gulp.parallel(compileDesignSystemCss, compileDocsCss, compileJs), watch, eleventy);


export const build = gulp.series(gulp.parallel(compileDesignSystemCss, compileDocsCss, compileJs), minifyDesignSystemCss);


export default build
