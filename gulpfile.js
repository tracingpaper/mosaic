const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const data = require('gulp-data')
const njkRender = require('gulp-nunjucks-render');
const connect = require("gulp-connect");
const sass = require('gulp-sass');
const gutil = require('gulp-util');

/**
 * HIGHLY RECOMMEND NOT TO EDIT THIS FILE
 * Usage:
 * -- gulp <task_name> (task_name as described below)
 * 
 * Tasks described:
 * -- nunjucks => Renders .njk files to .html
 * -- sass => Compiles app.scss file in src/scss folder to dist/css/app.css
 * -- browserify => Compiles app.js file in src/js folder to dist/js/app.js
 * -- build => Combination all the above tasks
 * -- watch => Continuous build on changes
 * -- serve => starts a live server
 */

// SOURCE
const SOURCE = {
    pages: "app/src/views/pages/**/*.+(html|nunjucks|njk)",
    js: './app/src/js/app.js',
    scss: "app/src/scss/app.scss",
};

//DESTINATIONS
const DEST = {
    nunjucks: 'app/dist',
    js: 'app/dist/js',
    scss: "app/dist/css"
};

// WATCH
const WATCH = {
    nunjucks: "app/src/views/**/*.+(html|nunjucks|njk)",
    js: "app/src/js/**/*.js",
    scss: "app/src/scss/**/*.scss"
}

/**
 * Compile Nunjucks files
 * Reads .njk or .html files from app/src/views/pages and render it to app/dist
 */
gulp.task("nunjucks", function() {
    //log
    gutil.log("=> Building HTML Pages...");
    // Get nunjucks template files
    return (
        gulp.src(SOURCE.pages)
        //add data
        .pipe(data(function() {
            return require("./app/config.json");
        }))
        // render nunjuck template files
        .pipe(njkRender({
            path: ['app/src/views/templates']
        }))
        //out to dist
        .pipe(gulp.dest(DEST.nunjucks))
        //livereload
        .pipe(connect.reload())
    );
});

/*
* Bundle JS using browserify
* Reads app.js from src/js and bundle it with the dependencies and save to app/dist/js
*/
gulp.task('browserify', function () {
    //log
    gutil.log("=> Building js files");
    //browserify
    return browserify(SOURCE.js)
        .bundle()
        //Convert to gulp stream
        .pipe(source('app.js'))
        //output to dist
        .pipe(gulp.dest(DEST.js))
        //livereload
        .pipe(connect.reload());
});


/*
* Compile Sass Files using node-sass
* reads .scss files from app/src/scss/app.scss and compile it to app/dist/css
*/
gulp.task("sass", function () {
    //log
    gutil.log("=> Building CSS Files...");
    //Compile SCSS
    return (
        gulp.src(SOURCE.scss)
        //catch error
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //output to dist/css
        .pipe(gulp.dest(DEST.scss))
        //livereload
        .pipe(connect.reload())
    );

});

/*
* Watch changes
*/
const watch = function() {

    gulp.watch(WATCH.nunjucks, gulp.series('nunjucks'));
    gulp.watch(WATCH.scss, gulp.series('sass'));
    gulp.watch(WATCH.js, gulp.series('browserify'));

};

gulp.task('watch', function () {
    watch();
});


/*
* Complete build
*/
gulp.task('build', gulp.series('nunjucks', 'sass', 'browserify'));


// live server port number
const PORT = 4000;


/*
* Starts a liveserver at port: PORT
*/
gulp.task('serve', function () {
    //log
    gutil.log(`=>Starting server at localhost:${PORT}`)
    //start server
    connect.server({
        port: 4000,
        root: 'app/dist',
        livereload: true
    });
    //watch
    watch();
});