// DEFINE Dev API URL here
const apiUrl =
  /* URL Should not end with /  */
  //url
 // "http://localhost:62550";
 "http://localhost:62912";
// "http://localhost:62550";

// requires
var gulp = require("gulp");
//var sass = require('gulp-sass');
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");
var imageop = require("gulp-image-optimization");
var gulpCopy = require("gulp-copy");
var cleanCSS = require("gulp-clean-css");
var minify = require("gulp-minify");
var minifyHtml = require("gulp-htmlmin");
var webserver = require("gulp-webserver");
var ngHtml2Js = require("gulp-ng-html2js");
// var uglify = require("gulp-uglify");
var inject = require("gulp-inject-string");
var watch = require("gulp-watch");
var gutil = require("gulp-util");
var replace = require("gulp-replace");
var strip = require("gulp-strip-comments");

var config = {
  production: gutil.env.env == "production",
};
// uglify = config.production ? uglify : gutil.noop;

//var minifyHtml = require('gulp-minify-html')
var runSequence = require("run-sequence").use(gulp);

var rimraf = require("rimraf");
var ngTemplate = require("gulp-ng-template");
var concatCss = require("gulp-concat-css");
var version = require("gulp-version-number");
var paths = {
  app: ["./app/**/*.js", "!./app/core/**/*.js"],
  core_constant: "./app/core/core.constants.js",
  core: [
    "./app/core/app.module.js",
    "./app/core/home/app.module.js",
    "./app/core/app.config.js",
    // "./app/core/core.constants.js",
    "./app/core/app.routes.js",
    "./app/core/confirmPassword.directive.js",
    "./app/core/numbersOnly.directive.js",
    "./app/core/translateProvider.js",
    "./app/core/ToastService.factory.js",
    "./app/core/GlobalAdmin/*.js",
    "./app/core/RestaurantAdmin/*.js",
    "./app/core/Delete/*.js",
    "./app/core/login/*.js",
    "./app/core/home/*.js",
    "./app/core/Authentication/*.js",
    "./app/core/Authorization/*.js",
    "./app/core/Toast/*.js",
    "./app/core/ImageCropper/imageCropper.Controller.js",

    // './app/**/*.*.js',
  ],
  libs: [
    "./assets/js/jquery2.2.3.min.js",

    "./node_modules/lodash/lodash.min.js",
    "./node_modules/angular/angular.js",
    "./node_modules/angular-sanitize/angular-sanitize.min.js",
    "./node_modules/angular-ui-router/release/angular-ui-router.js",
    "./node_modules/angular-resource/angular-resource.js",
    "./node_modules/angular-permission/dist/angular-permission.js",
    "./node_modules/angular-animate/angular-animate.js",
    "./node_modules/angular-messages/angular-messages.js",
    "./node_modules/angular-aria/angular-aria.js",
    "./node_modules/ngstorage/ngStorage.js",
    //'./node_modules/angular-material/angular-material.js',
    "./node_modules/propellerkit/dist/js/propeller.min.js",
    "./node_modules/propellerkit/dist/js/bootstrap.min.js",
    "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
    "./node_modules/angular-paging/dist/paging.js",
    "./node_modules/ngprogress-lite/ngprogress-lite.min.js",
    "./node_modules/angular-translate/dist/angular-translate.min.js",
    "./node_modules/angular-ui-event/dist/event.min.js",
    "./node_modules/select2/dist/js/select2.full.min.js",
    "./node_modules/angular-ui-select2/src/select2.js",

    "./assets/js/moment-with-locales.js",
    "./assets/js/bootstrap-datetimepicker.js",
    "./node_modules/angular-ui-carousel/dist/ui-carousel.min.js",
    "./assets/js/jk-rating-stars.min.js",
    "./assets/js/angular-filter.js",
    "./node_modules/adm-trv/dist/ADM-treeView.js",
    "./node_modules/angular-breadcrumb/dist/angular-breadcrumb.min.js",
    "./node_modules/html2canvas/dist/html2canvas.min.js",
    "./node_modules/pdfmake/build/pdfmake.min.js",
    "./node_modules/angular-jwt/dist/angular-jwt.min.js",
    // './node_modules/jwt-decode/build/jwt-decode.min.js',
    "./assets/js/angular-block-ui.min.js",
    "./assets/js/signalr.js",
    // './node_modules/angular-datatables/dist/angular-datatables.min.js'
    "./node_modules/videogular/dist/videogular/videogular.min.js",
    "./node_modules/videogular/dist/poster/vg-poster.min.js",
    "./node_modules/videogular/dist/controls/vg-controls.min.js",

    "./node_modules/ui-cropper/compile/unminified/ui-cropper.js",
    "./node_modules/angularjs-datetime-picker/angularjs-datetime-picker.js",

    "./node_modules/chart.js/dist/Chart.min.js",
    "./node_modules/angular-chart.js/dist/angular-chart.min.js",
    "./node_modules/tc-angular-chartjs/dist/tc-angular-chartjs.min.js",
  ],
  css: [
    "./node_modules/propellerkit/dist/css/bootstrap.min.css",
    "./node_modules/propellerkit/dist/css/propeller.min.css",

    "./node_modules/select2/dist/css/select2.min.css",
    "./node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css",

    "./assets/css/*.css",
    "./assets/css/ADM-treeView.css",
    "./node_modules/ngprogress-lite/ngprogress-lite.css",
    "./node_modules/nvd3/build/nv.d3.min.css",
    "./node_modules/angular-ui-carousel/dist/ui-carousel.min.css",
    "./node_modules/angular-datatables/dist/css/angular-datatables.css",
    "./node_modules/videogular/dist/themes/default/videogular.min.css",
    "./node_modules/ui-cropper/compile/unminified/ui-cropper.css",

    "./node_modules/angularjs-datetime-picker/angularjs-datetime-picker.css",
  ],
  cssAR: [
    // './node_modules/propellerkit/dist/css/bootstrap.min.css',
    // './node_modules/propellerkit/dist/css/propeller.min.css',
    "./node_modules/select2/dist/css/select2.min.css",
    "./node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css",

    "./assets/cssAR/*.css",
    "./assets/css/ADM-treeView.css",
    "./node_modules/ngprogress-lite/ngprogress-lite.css",
    "./node_modules/nvd3/build/nv.d3.min.css",
    "./node_modules/angular-ui-carousel/dist/ui-carousel.min.css",
    "./node_modules/angular-datatables/dist/css/angular-datatables.css",
    "./node_modules/videogular/dist/themes/default/videogular.min.css",
  ],
  templates: ["./app/**/*.html"],
  index: "./index.html",
  favicon: "src/favicon1.ico",
  build: "dist",
  temp: ".tmp",
  docs: ".documentation",
};

// sass task
//gulp
//	.task('sass', function () {
//	  return gulp.src('./assets/sass/**/*.scss')
//	    .pipe(sass().on('error', sass.logError))
//	    .pipe(gulp.dest('./assets/css'));
//});

//gulp
//	.task('sass:watch', function () {
//	  gulp
//		  .watch('./assets/sass/**/*.scss', ['sass'])
//				.on('change', function(event) {
//		    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//		    });
//});

//concatination js
gulp.task("copy-libs", function () {
  return (
    gulp
      .src(paths.libs)
      .pipe(concat("libs.js"))
      // .pipe(uglify())
      .pipe(strip())
      .pipe(gulp.dest(paths.build + "/"))
  );
});

gulp.task("replace-api-url", function () {
  return (
    gulp
      .src(paths.core_constant)
      //##API_URL##
      .pipe(replace("##API_URL##", config.production ? "" : apiUrl))
      .pipe(gulp.dest(paths.build + "/"))
  );
});
//concatination js
gulp.task("copy-core", ["replace-api-url"], function () {
  const _corePaths = paths.core;
  _corePaths.splice(3, 0, paths.build + "/core.constants.js");

  return (
    gulp
      .src(_corePaths)
      .pipe(concat("core.js", { newLine: ";" }))
      //.pipe(uglify())
      .pipe(gulp.dest(paths.build + "/"))
  );
});

//concatination js
gulp.task("copy-app", function () {
  return (
    gulp
      .src(paths.app)
      .pipe(concat("app.js", { newLine: "" }))
      //.pipe(uglify())
      .pipe(strip())
      .pipe(gulp.dest(paths.build + "/"))
  );
});

//concat css
gulp.task("css", function () {
  return gulp
    .src(paths.css)
    .pipe(concat("bundle-en.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.build + "/"));
});

gulp.task("cssAR", function () {
  return gulp
    .src(paths.cssAR)
    .pipe(concat("bundle-ar.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.build + "/"));
});

//concat css
/* gulp.task('img', function () {
   return gulp.src(paths.assets)
     .pipe(concat('img.svg'))
     .pipe(gulp.dest(paths.build + '/'));
 });
*/
gulp.task("images", function (cb) {
  return gulp
    .src(["./assets/img/*"])
    .pipe(gulp.dest(paths.build + "/assets/img"));
});

gulp.task("svgs", function (cb) {
  return gulp
    .src(["./assets/svg/*"])
    .pipe(gulp.dest(paths.build + "/assets/svg"));
});

gulp.task("fonts", function (cb) {
  return gulp
    .src(["./assets/fonts/**/*.{eot,svg,ttf,woff,woff2}"])
    .pipe(gulp.dest(paths.build + "/fonts"));
});
//cash template
gulp.task("copy-templates", function () {
  return (
    gulp
      .src(paths.templates)
      .pipe(
        ngHtml2Js({
          moduleName: "home",
          declareModule: false,
          rename: function (templateUrl) {
            return "./app/" + templateUrl;
          },
        })
      )
      .pipe(concat("templates.js"))
      // .pipe(uglify())
      .pipe(strip())
      .pipe(gulp.dest(paths.build + "/"))
  );
});

// gulp.task('copy-templates', function() {
//   gulp.src('./app/**/*.html')
//     .pipe(minifyHtml({empty: true, quotes: true}))
//     .pipe(ngTemplate({
//       moduleName: 'vlabs',
//       standalone: true,
//       filePath: 'templates.js'
//     }))
//     .pipe(gulp.dest(paths.build + '/'));  // output file: 'dist/js/templates.js'
// })

gulp.task("copy-index", function () {
  return gulp
    .src(paths.index)
    .pipe(
      version({
        value: "%MD5%",
        replaces: [/#{VERSION_REPlACE}#/g],
      })
    )

    .pipe(gulp.dest(paths.build + "/"));
});

//serving
gulp.task("serve", function () {
  return gulp.src(paths.build).pipe(
    webserver({
      port: 9092,
      host: "localhost",
      livereload: true,
      open: true,
    })
  );
});

// copy task
gulp.task("copy", [
  "cssAR",
  "css",
  "copy-libs",
  "copy-core",
  "copy-app",
  "copy-templates",
  "copy-index",
  "images",
  "svgs",
  "fonts",
]);

//clean temp files
gulp.task("remove-temp-files", function (cb) {
  rimraf(paths.build + "/core.constants.js", cb);
});

//clean build
gulp.task("clean-build", function (cb) {
  rimraf(paths.build, cb);
});

// clean temp
gulp.task("clean-temp", function (cb) {
  rimraf(paths.temp, cb);
});

gulp.task("clean", ["clean-temp", "clean-build"]);

gulp.task("build", function (cb) {
  return runSequence("clean", "copy", "remove-temp-files", cb);
});

gulp.task("watch", function (cb) {
  gulp.watch(paths.libs, ["copy-libs"]);
  gulp.watch(paths.core, ["copy-core"]);
  gulp.watch(paths.app, ["copy-app"]);
  gulp.watch(paths.templates, ["copy-templates"]);
  gulp.watch(paths.index, ["copy-index"]);
});

gulp.task("default", function (cb) {
  runSequence("build", "serve", "watch", cb);
});

gulp.task("only", function (cb) {
  runSequence("build", "watch", cb);
});
