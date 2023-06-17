const gulp = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const sourcemap = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imageMin = require('gulp-imagemin')

function reduzImagem() {  
    return gulp.src('./source/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/img'))
}

function compilarSass() {  
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemap.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemap.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial:false}, gulp.series(compilarSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial:false}, gulp.series(comprimeJavaScript))
    gulp.watch('./source/img/*', {ignoreInitial:false}, gulp.series(reduzImagem))
}