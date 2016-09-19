var gulp = require('gulp');
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var autoprefixer= require("gulp-autoprefixer");
// tasks

/* Deals with styles tasks (compiles sass to css , adds prefixes,
* puts in destination) and then reloads with browser-sync
*/
gulp.task("styles", function () {
  return gulp.src("assets/sass/main.scss")
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer())
.pipe(gulp.dest("assets/css"))
.pipe(browserSync.reload({stream:true}));
});

// copy files
gulp.task("copy", function(){
  return gulp.src(/* put here files to copy like this ==> */ ['assets/css/main.css','assets/js/custom.js','index.html','CodePlayer.html'])
  .pipe(gulp.dest('./dist')/* destination folder*/);
});

// just the sass ()
gulp.task("sass" , function () {
  return gulp.src('assets/sass/main.scss')
      .pipe(sass().on('error' , sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('assets/css'));
});

gulp.task('watch-sass' , ['sass'] , function(){
  gulp.watch('assets/sass/*' , ['sass']);
});

// Serve files from base directory
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

// watches files and manually reloads after  files change

gulp.task('watch', ['serve'], function () {
  gulp.watch("assets/**/*.scss", ['styles']);
  gulp.watch("assets/**/*.svg", ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('assets/**/*.js').on('change', browserSync.reload);
});


gulp.task("default", ['styles', 'watch']);
