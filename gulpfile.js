import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import del from 'del';
import { stacksvg } from 'gulp-stacksvg';

// Styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML
const htmlMinimizer = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin ({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
 }

//Scripts
const jsMinimizer = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

//Images
const imagesOptimizer = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

const imagesConverter = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/backgrounds/*.jpg'])
    .pipe(squoosh({
      webp: {quality: 80}, //На стандартном качестве местами видно мыльцо
      avif: {quality: 80},
    }))
    .pipe(gulp.dest('build/img'));
}

const imagesCopy = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

//SVG
const svgOptimizer = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
}

const { src, dest } = gulp
function makeStack () {
	return src(`source/img/icons/*.svg`)
		.pipe(stacksvg({ output: `sprite` }))
		.pipe(dest(`build/img/`))
}

//Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.svg',
    'source/*webmanifest',
  ], {
  base: 'source'
  })
    .pipe(gulp.dest('build'))
    done();
}

//Clean
const clean = () => {
  return del('build');
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(jsMinimizer));
  gulp.watch('source/*.html', gulp.series(htmlMinimizer));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build
export const build = gulp.series(
  clean,
  copy,
  imagesOptimizer,
  gulp.parallel(
  styles,
  htmlMinimizer,
  jsMinimizer,
  svgOptimizer,
  makeStack,
  imagesConverter,
  ),
);

// Default
export default gulp.series(
  clean,
  copy,
  imagesCopy,
  gulp.parallel(
    styles,
    htmlMinimizer,
    jsMinimizer,
    svgOptimizer,
    makeStack,
    imagesConverter,
  ),
  gulp.series(
    server,
    watcher
));
