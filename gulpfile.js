const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const stripCssComments = require('gulp-strip-css-comments')
const uglify=  require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create()
let reload = browserSync.reload

// BrowserSync
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch("*.html").on("change", reload)
    gulp.watch("./assets/css/style.css").on("change", reload)
    gulp.watch("./assets/js/script.js").on("change", reload)
})

// Agrupar, minificar e remover comentarios do CSS
gulp.task('css', function(){
	var css = [
		'./assets/css/*.css',
		'./assets/css/style.css'
	]
	gulp.src(css)
		.pipe(concat('style.min.css'))
		.pipe(stripCssComments({all: true}))
		.pipe(cssmin())
		.pipe(gulp.dest('assets/css/'))
})

// Minificação JS
gulp.task('js', function(){
	gulp.src('assets/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
})

// Otimização das imagens
gulp.task('images', function(){
	gulp.src(['assets/img/*.jpg', 'assets/img/*.png'])
		.pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
		.pipe(gulp.dest('assets/img/'))
})

gulp.task('default', ['serve', 'css', 'js', 'images'])