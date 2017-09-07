var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var uglify=  require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var watch = require('gulp-watch')
var browserSync = require('browser-sync')
var cp = require('child_process');

// Build jekyll site
gulp.task('jekyll-build', function (done) {
	return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'})
		.on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

// Browser-sync
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

// SCSS task
gulp.task('scss', function(){
	gulp.src('src/*.scss')
		.pipe(concat('main.css'))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('assets/'))	
})

// Javascript task
gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
})

// Images task
gulp.task('images', function(){
	gulp.src(['src/img/*.jpg', 'src/img/*.png'])
		.pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
		.pipe(gulp.dest('assets/img/'))
})

gulp.task('default', ['sass', 'js', 'images'])