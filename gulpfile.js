var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer"),
  bourbon = require("node-bourbon"),
  ftp = require("vinyl-ftp"),
  rigger = require("gulp-rigger"),
  fileinclude = require("gulp-file-include"),
  jade = require("jade"),
  gulpJade = require("gulp-jade"),
  notify = require("gulp-notify"),
  sourcemaps = require("gulp-sourcemaps"),
  spritesmith = require("gulp.spritesmith"),
  pagebuilder = require("gulp-pagebuilder"),
  csso = require("gulp-csso"),
  concatCss = require("gulp-concat-css"),
  gulpLoadPlugins = require("gulp-load-plugins"),
  combiner = require("stream-combiner2"),
  emitty = require("emitty"),
  debug = require("gulp-debug"),
  gulpif = require("gulp-if"),
  series = require("series"),
  gulpMerge = require("gulp-merge");

/*********************************************
 * Объединение и минимизация JS
 ***********************************************/

var svgSprite = require("gulp-svg-sprite"),
  svgmin = require("gulp-svgmin"),
  replace = require("gulp-replace");

var cheerio = require("gulp-cheerio");

gulp.task('sprite', function () {
	return gulp.src('app/svg/sprite/*.svg')
	// minify svg
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	// remove all fill and style declarations in out shapes
	.pipe(cheerio({
		run: function ($) {
		/*	$('[fill]').removeAttr('fill');*/
/*			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');*/
		},
		parserOptions: {xmlMode: true}
	}))
	// cheerio plugin create unnecessary string '&gt;', so replace it.
	.pipe(replace('&gt;', '>'))
	// build svg sprite
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "sprite.svg",
				render: {
					scss: {
						dest:'_sprite.scss',
						template: 'app/svg/tpl/sprite-template.scss'
					}
				},
				example: true
			}
		}
	}))
	.pipe(gulp.dest('app/svg/'));
});
/*********************************************
 * Объединение и минимизация JS
 ***********************************************/
gulp.task("scripts", function () {
  return gulp
    .src(["app/libs/js/jquery.min.js", "app/libs/js/bootstrap.min.js"])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

/*********************************************
 * Объединение и минимизация CSS
 ***********************************************/

gulp.task("concat", function () {
  return gulp
    .src(["app/libs/css/*.css"])
    .pipe(concatCss("libs.min.css"))
    .pipe(gulp.dest("app/css/"));
});

gulp.task("sass", function () {
  return (
    gulp
      .src("app/sass/**/*.sass")
      .pipe(
        sass({
          includePaths: bourbon.includePaths,
        }).on("error", notify.onError())
      )
      .pipe(autoprefixer(["last 15 versions"]))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("csso", function () {
  return gulp.src("app/css/*.css").pipe(csso()).pipe(gulp.dest("public/css/"));
});

gulp.task("update-dependencies", function () {
  var css = gulp
    .src([
      "app/libs/owl.carousel/dist/assets/**",
      "app/libs/jquery.form-styler/dist/*.css",
      "app/libs/slimmenu/dist/css/slimmenu.min.css",
      "node_modules/fotorama/*.css",
      "node_modules/fotorama/*.png",
      "app/libs/slick-carousel/slick/*.css",
      "app/libs/slick-carousel/slick/*.gif",
      "app/libs/arcticModal/arcticmodal/jquery.arcticmodal.css",
      "app/libs/arcticModal/arcticmodal/loading.gif",
      "app/libs/nanoscroller/bin/css/nanoscroller.css",
      "app/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css",
    ])
    .pipe(gulp.dest("app/css"));
  var js = gulp
    .src([
      "app/libs/jquery/dist/jquery.min.js",
      "app/libs/owl.carousel/dist/owl.carousel.min.js",
      "app/libs/jquery.form-styler/dist/jquery.formstyler.min.js",
      "app/libs/slimmenu/dist/js/jquery.slimmenu.min.js",
      "node_modules/fotorama/fotorama.js",
      "app/libs/slick-carousel/slick/*.js",
      "app/libs/owl.carousel2.thumbs/dist/*.js",
      "app/libs/readmore-js/*.js",
      "app/libs/arcticModal/arcticmodal/jquery.arcticmodal.js",
      "node_modules/baron/baron.min.js",
      "app/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
      "app/libs/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js",
    ])
    .pipe(gulp.dest("app/js"));
  var arcticModal = gulp
    .src(["app/libs/arcticModal/arcticmodal/jquery.arcticmodal.js"])
    .pipe(rename("jquery.arcticmodal-0.3.min.js"))
    .pipe(gulp.dest("app/js"));
  var nanoscroller = gulp
    .src(["app/libs/nanoscroller/bin/javascripts/jquery.nanoscroller.js"])
    .pipe(rename("nanoScroller.js"))
    .pipe(gulp.dest("app/js"));
  var merge = gulpMerge(css, js, arcticModal, nanoscroller);
  return merge;
});

/*********************************************
 * jade
 ***********************************************/
var gp = gulpLoadPlugins();
var emittyPug = emitty.setup("jade", "jade");

gulp.task("jade", function () {
  return combiner
    .obj([
      gulp.src("jade/*.jade"),
      gp.if(global.watch, emittyPug.stream(global.pugChangedFile)),
      gp.jade({
        jade: jade,
        pretty: true,
      }),
      gp.debug({ title: "Asset task 'html'" }),
      gulp.dest("app"),
    ])
    .on(
      "error",
      gp.notify.onError(function (err) {
        return {
          title: "Error task 'html'",
          message: err.message,
        };
      })
    );
});
/*********************************************
 *
 ***********************************************/
gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app",
    },
    notify: false,
  });
});

/*********************************************
 * Spritesmith
 ***********************************************/
gulp.task("spritesmith", function () {
  var spriteData = gulp
    .src("app/img/sprites/*.*") // путь, откуда берем картинки для спрайта
    .pipe(
      spritesmith({
        imgName: "sprite.png",
        imgPath: "../img/sprite.png",
        cssTemplate: "app/img/tpl/spritesmith.cssTemplate",
        padding: 8,
        cssName: "sprite.css",
        cssFormat: "css",
        algorithm: "binary-tree",
        cssVarMap: function (sprite) {
          sprite.name = sprite.name;
        },
      })
    );

  spriteData.img.pipe(gulp.dest("app/img/")); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest("app/sprite/")); // путь, куда сохраняем стили
});

gulp.task("watch", ["browser-sync", "build"], function () {
  global.watch = true;
  gulp.watch("app/sass/**/*.sass", ["sass"]);

  gulp.watch("app/sass/**/*.scss", ["sass"]);

  gulp.watch("app/css/**/*.css", ["csso"]);

  gulp.watch("app/img/sprite.png", ["spritesmith"]);

  gulp.watch("app/svg/sprite/*", ["sprite"]).on("change", function (evt) {
    changeEvent(evt);
  });

  gulp.watch('jade/**/*.jade', ['jade']);

  gulp.watch(["libs/**/*.js", "app/js/common.js"], ["scripts"]);
  gulp.watch("app/*.html", browserSync.reload);
});

gulp.task("imagemin", function () {
  return gulp
    .src("app/img/**/*")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/img"));
});

gulp.task("build", [
  "sass",
  "concat",
  "spritesmith",
  "jade",
  "scripts",
  "sprite",
]);

gulp.task("deploy", function () {
  var conn = ftp.create({
    host: "hostname.com",
    user: "username",
    password: "userpassword",
    parallel: 10,
    log: gutil.log,
  });

  var globs = ["dist/**", "dist/.htaccess"];
  return gulp
    .src(globs, { buffer: false })
    .pipe(conn.dest("/path/to/folder/on/server"));
});

gulp.task("removedist", function () {
  return del.sync("dist");
});
gulp.task("clearcache", function () {
  return cache.clearAll();
});

gulp.task("default", ["watch"]);
