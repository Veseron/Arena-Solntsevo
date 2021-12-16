const { src, dest, watch, parallel, series } = require('gulp')
const scss = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify-es').default,
prefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
del = require('del'),
sassGlob = require('gulp-sass-glob'),
pug = require('gulp-pug'),
svgSprite = require('gulp-svg-sprite'),
webpack = require('webpack-stream')

const config = {
    build_folder: './build/'
}

const browserSync = require('browser-sync').create()

function sync(done) {
    watch('build/**/*').on('change', browserSync.reload)
    browserSync.init({
        server: "build/"
    });
}

function images() {
return src('src/assets/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest(`${config.build_folder}/assets/images/`))
}

function sprites() {
    return src('src/assets/sprites/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `sprite.svg`
                }
            }
        }))
        .pipe(dest(`${config.build_folder}/assets/`))
}

function styles() {
    return src('src/scss/style.scss')
        .pipe(sassGlob())
        .pipe(scss({outputStyle: 'compressed', allowEmpty: true}))
        .pipe(concat('style.min.css'))
        .pipe(prefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest(`${config.build_folder}/css`))
        .pipe(browserSync.stream())
}

function clearDist() {
    return del(config.build_folder)
}

function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.js',
        'src/js/**/*.js'
    ])
        .pipe(webpack({
            mode: 'development'
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest(`${config.build_folder}/js`))
        .pipe(browserSync.stream())
}

function html() {
    return src(['src/markup/**/*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(dest(config.build_folder))
        .pipe(browserSync.stream())
}

function fonts() {
    return src(['src/assets/fonts/**/*'])
        .pipe(dest(`${config.build_folder}/assets/fonts/`))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*.scss'], styles)
    watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
    watch(['src/markup/**/*.pug'], html)
}

exports.styles = styles
exports.watching = watching
exports.sync = sync
exports.scripts = scripts
exports.images = images
exports.clearDist = clearDist
exports.html = html
exports.sprites = sprites
exports.fonts = fonts

exports.build = series(html, images, fonts, styles, scripts, sprites)
exports.default = parallel(styles, html, images, sprites, fonts, scripts, sync, watching)
