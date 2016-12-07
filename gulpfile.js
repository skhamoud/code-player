var gulp = require('gulp');
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var autoprefixer= require("gulp-autoprefixer");
var merge = require('merge-stream');

let dependencies = {
  css : ["node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/font-awesome/css/font-awesome.min.css",
        "node_modules/animate.css/animate.min.css"],
  js  : ["node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"]
};


let src = {
  sass : "assets/sass/",
  js : "assets/js/",
  img :  "assets/img/"
};
let public = {
  css : 'public/css/',
  js : "public/js/"
};


//============= Tasks ====================

// Run Once After Installation If Dev Env is offline
// And Use CDN for production
gulp.task('copyDependencies', function() {
  var cssDep = gulp.src(dependencies.css)
              .pipe(gulp.dest(public.css));
  var jsDep = gulp.src(dependencies.js)
              .pipe(gulp.dest(public.js));
  return merge(cssDep, jsDep);
});

gulp.task("styles", ()=> {
  return gulp.src(src.sass +"main.scss")
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer())
.pipe(gulp.dest(public.css))
.pipe(browserSync.reload({stream:true}));
});

// Serve files from base directory
gulp.task('serve', ['styles'] , function() {
  browserSync.init({
    server: {
      baseDir: './public/'
    }
  });
});

// watches files and manually reloads after  files change
gulp.task('watch', function () {
  gulp.watch(src.sass + "*", ['styles']);
  gulp.watch(public + '*.html').on('change', browserSync.reload);
  gulp.watch(public.js + 'main.js').on('change', browserSync.reload);
});


gulp.task("default", ['serve', 'watch']);
