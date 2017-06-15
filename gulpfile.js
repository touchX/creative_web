var gulp =require('gulp'),
    plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('default',function(){
    gulp.src('./assets/**')
    .pipe(gulp.dest('./dist/assets'));

    gulp.src('index.html').pipe(gulp.dest('./dist'));
});
gulp.task('svgsprites',function(){
    gulp.src('./assets/svg/element/*.svg')
        .pipe(plugins.svgSymbols())
        .pipe(gulp.dest('./assets/svg'));
});
gulp.task('server',function(){
    browserSync.init({
        server:"./"
    });

   
    gulp.watch("*.html").on('change', browserSync.reload);
});

