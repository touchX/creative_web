var gulp = require('gulp'),
    cssmin = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('testCssmin',function(){
    gulp.src('assets/css/*.css')
        .pipe(cssver())  //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('jsmin',function(){
    //压缩src/js目录下的所有js文件
    gulp.src(['./assets/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

//动态服务器
gulp.task('browser-sync-dynamic',function(){
    browserSync.init({
        proxy: "你的域名或IP"
    });
});

gulp.task('default', function(){
    console.log('default task');
});