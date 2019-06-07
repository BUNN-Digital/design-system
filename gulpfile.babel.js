/**
 * Required Packages
 */
import gulp from 'gulp';
import child_process from 'child_process';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
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

    vendorScripts: [
        './node_modules/owl.carousel/dist/owl.carousel.js'
    ]

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
    return gulp.src(paths.designSystem.src + 'css/*.css')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(postcss())
        .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
        .pipe(notify({
            message: 'Compiled design system CSS'
        }));
}

/**
 * Compile Docs CSS
 */
const compileDocsCss = () => {
    return gulp.src([
            paths.docs.src + 'css/docs.css',
            paths.docs.src + 'css/fonts.css',
        ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(postcss())
        .pipe(gulp.dest(paths.docs.dest + 'css/'))
        .pipe(notify({
            message: 'Compiled docs CSS'
        }));
}

/**
 * Compile Vendor JS
 */
const compileVendorJs = () => {
    return gulp.src(paths.vendorScripts)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled vendor JS'
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
            sourceType: 'script'
        }))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/components/'))
        .pipe(concat('components_all.js'))
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled design system components JS'
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
            sourceType: 'script'
        }))
        .pipe(concat('docs.js'))
        .pipe(gulp.dest(paths.docs.dest + 'js/'))
        .pipe(notify({
            message: 'Compiled Docs JS'
        }));
}

const watch = (done) => {
    gulp.watch('./tailwind.config.js', compileDesignSystemCss);
    
    gulp.watch(paths.designSystem.src + 'css/**/*.css', compileDesignSystemCss);
    
    gulp.watch(paths.docs.src + 'css/**/*.css', compileDocsCss);
    
    gulp.watch(paths.designSystem.src + 'js/**/*.js', gulp.series(compileJs));
    
    gulp.watch(paths.docs.src + 'js/**/*.js', compileDocsJs);
    
    done();
}

const eleventy = () => {
    const command = 'eleventy --config=eleventy.config.js --serve';
    
    return child_process.spawn(command, {
        stdio: 'inherit',
        shell: true
    });
}

const compileJs = gulp.series(
    gulp.parallel(compileVendorJs, compileDesignSystemComponentsJs, compileDesignSystemGlobalJs, compileDocsJs)
)

const compileCss = gulp.parallel(compileDesignSystemCss, compileDocsCss)

const compileAssets = gulp.parallel(compileCss, compileJs)

export {
    compileDesignSystemCss,
    compileDocsCss,
    compileJs,
    compileCss,
    compileAssets
}

export const build = gulp.parallel(compileCss, compileJs);
export const dev = gulp.series(build, watch, eleventy);



export default build
