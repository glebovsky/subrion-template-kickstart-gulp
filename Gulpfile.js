var pjson      = require('./package.json'),
    gulp       = require("gulp"),
    gutil      = require('gulp-util'),
    concat     = require("gulp-concat"),
    imagemin   = require("gulp-imagemin"),
    less       = require("gulp-less"),
    cleanCSS   = require('gulp-clean-css');

var config = {
    paths: {
        images: {
            src:  ["img/**/*.jpg", "img/**/*.jpeg", "img/**/*.png"],
            dest: "img"
        },
        less: {
            path: "less/**/*.less",
            src:  "less/iabootstrap.less",
            dest: "css"
        }
    }
};

gulp.task("images", function(){
    return gulp.src(config.paths.images.src)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.images.dest));
});

gulp.task("less", function(){
    return gulp.src(config.paths.less.src)
        .pipe(less().on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(cleanCSS({
            advanced: false
        }))
        .pipe(concat("base.css"))
        .pipe(gulp.dest(config.paths.less.dest));
});

gulp.task("build", ["less", "images"]);

gulp.task("watch", function(){
    gulp.watch(config.paths.less.path, ["less"]);
});

gulp.task("default", function() {
    console.log('Silence is gold');
});