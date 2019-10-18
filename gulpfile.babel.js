import gulp from 'gulp'
import babelify from 'babelify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import childProcess from 'child_process'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import debug from 'gulp-debug'

/* === CONFIG === */
const paths = {

  designSystem: {
    src: './resources/design-system/',
    dest: 'design-system/'
  },

  docs: {
    src: './resources/docs/',
    dest: 'docs/'
  },

  vendorLibs: [
    './node_modules/owl.carousel/dist/owl.carousel.js',
    './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    './node_modules/enquire.js/dist/enquire.js'
  ]
}

/**
 * Errors function
 */
const onError = (err) => {
  notify.onError({
    title: 'Gulp Error - Compile Failed',
    message: 'Error: <%= error.message %>'
  })(err)

  this.emit('end')
}

/* === DESIGN SYSTEM CSS === */

export const compileDesignSystemCss = () => {
  return gulp.src(paths.designSystem.src + 'css/*.css')
    .pipe(postcss())
    .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.designSystem.dest + 'css/'))
}

/* === DOCS CSS === */

export const compileDocsCss = () => {
  return gulp.src([
    paths.docs.src + 'css/docs.css',
    paths.docs.src + 'css/fonts.css'
  ])
    .pipe(postcss())
    .pipe(gulp.dest(paths.docs.dest + 'css/'))
}

/* === VENDOR LIBS === */
export const compileVendorJs = () => {
  return gulp.src(paths.vendorLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
}

/* === DESIGN SYSTEM JS === */

export const compileDesignSystemJs = () => {
  return browserify({
    entries: paths.designSystem.src + 'js/bunn-design-system.js',
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('bunn-design-system.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.designSystem.dest + 'js/'))
}

/* === DOCS JS === */

export const compileDocsJs = () => {
  return browserify({
    entries: paths.docs.src + 'js/docs.js',
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('docs.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.docs.dest + 'js/'))
}

/* === WATCH === */

const watch = (done) => {
  gulp.watch(paths.designSystem.src + 'css/**/*.css', compileDesignSystemCss)
  gulp.watch(paths.docs.src + 'css/**/*.css', compileDocsCss)
  gulp.watch(paths.designSystem.src + 'js/**/*.js', compileDesignSystemJs)
  gulp.watch(paths.docs.src + 'js/**/*.js', compileDocsJs)
  done()
}

/* === ELEVENTY === */

const eleventy = () => {
  const command = 'eleventy --config=eleventy.config.js --serve'

  return childProcess.spawn(command, {
    stdio: 'inherit',
    shell: true
  })
}

/* === TASKS === */

export const build = gulp.parallel(compileDesignSystemJs, compileDocsJs, compileDesignSystemCss, compileDocsCss)
export const dev = gulp.series(build, watch, eleventy)

export default build
