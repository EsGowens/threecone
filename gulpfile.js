// move my html
// compile the JS using webpack
// watch
// default task (gulp)

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { watch, parallel } = require('gulp');
const webpack = require('webpack-stream')

function js (cb){
    gulp.src('src/js/*')
        .pipe(webpack({
            mode: 'production',
            devtool: 'source-map',
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
    cb();
}


function HTML(cb) {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))

    cb();
}


function Sync(cb){
    browserSync.init({
        server: {
            baseDir: ('dist')
        }
    })

    cb();
}

exports.default = function () {
    watch('src/js/*', js)
    watch('src/*', parallel(HTML, Sync)).on('change', browserSync.reload); 
    

    
};