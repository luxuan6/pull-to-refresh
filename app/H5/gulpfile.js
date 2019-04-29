const gulp = require('gulp');
const server = require('gulp-webserver');

gulp.task('server', function() {
    gulp.src('./src/')
        .pipe(server({
            open: true,
            port: 8787,
            livereload: true,
            proxies: [{
                source: '/api/find',
                target: 'http://localhost:3000/api/find'
            }]
        }))

})