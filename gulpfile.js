var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var uglify=  require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var watch = require('gulp-watch')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

// BrowserSync
gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	})
	gulp.watch("**/*.html").on("change", reload)
	gulp.watch("./src/js/script.js").on("change", reload)
	gulp.watch("./src/*.sass").on("change", reload)
})

gulp.task('sass', function(){
	gulp.src('src/*.scss')
		.pipe(concat('main.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('assets/'))	
})

// Minificação JS
gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
})

// Otimização das imagens
gulp.task('images', function(){
	gulp.src(['src/img/*.jpg', 'src/img/*.png'])
		.pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
		.pipe(gulp.dest('assets/img/'))
})

gulp.task('default', ['sass', 'js', 'images'])