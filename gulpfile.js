const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task(
    'prepare:assets',
    (done) => {

    }
);

gulp.task(
    'build',
    function () {
        return gulp.src('src/index.ts')
            .pipe(
                webpack(
                    {
                        config: require('./webpack.config.js')
                    }
                )
            )
            .pipe(gulp.dest('dist/'));
    }
);

// Default
gulp.task("default", ["build"]);