var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gutil = require('gulp-util');

function compile(watch) {
    var bundler = watchify(

        browserify(
            './src/main.js',
            { debug: true, paths: './src/' })
            .transform(babelify, {presets: ["es2015", "react"]})
    );

    function rebundle() {
        bundler.bundle()
            .on('error', function( err ) {
                gutil.log( gutil.colors.red("Error:"), err.message );
                this.emit('end');
            })
            .on('end', function( result ){
                gutil.log( "bundle finished!\n\n");
            })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        bundler.on('update', function() {
            gutil.log('bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
