"use strict";

var gulp=require("gulp");
var less=require("gulp-less");
var cssnano=require("gulp-cssnano");
var htmlmin=require("gulp-htmlmin");
var uglify=require("gulp-uglify");
var concat=require("gulp-concat");
var browserSync=require("browser-sync");
var reload=browserSync.reload;

// gulp.watch()

gulp.task("style",function () {
    gulp.src(["src/style/*.less","!src/style/_*.less"])
        .pipe(less())
        // .pipe(cssnano())
        .pipe(gulp.dest("dist/style"))
        .pipe(reload({stream:true}))
});

gulp.task("js",function () {
   gulp.src("src/scripts/*.js")
       .pipe(concat("all.js"))
       .pipe(uglify())
       .pipe(gulp.dest("dist/scripts"))
       .pipe(reload({stream:true}))
});


gulp.task("img",function () {
   gulp.src("src/images/*.*")
       .pipe(gulp.dest("dist/images"))
       .pipe(reload({stream:true}))

});


gulp.task("html",function () {
        gulp.src("src/*.html")
            .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
            .pipe(gulp.dest("dist"))
            .pipe(reload({stream:true}))
});


gulp.task("serve",function () {
    browserSync({server: {baseDir:["dist"]}}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch("src/scripts/*.js",["js"]);
    gulp.watch("src/style/*.less",["style"]);
    gulp.watch("src/images/*.*",["img"]);
    gulp.watch("src/*.html",["html"]);

});
