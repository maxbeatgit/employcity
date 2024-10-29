import gulp from 'gulp';
import { path } from './gulpconfig.js';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import newer from 'gulp-newer';
import fs from 'fs-extra';
import fileInclude from 'gulp-file-include';
import prettify from 'gulp-prettify';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import webpack from 'webpack-stream';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import minpng from 'imagemin-pngquant';
import minjpg from 'imagemin-mozjpeg';
import webpconvert from 'gulp-webp';
import webphtml from 'gulp-webp-html-nosvg';
import webpcss from 'gulp-webpcss';
import svgsprite from 'gulp-svg-sprite';


/* Notify */
const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
}

/* Server */
export const server = (done) => {
	browsersync.init({
		server: {
			baseDir: `${path.build.html}`
		},
		notify: false,
		port: 3000,
	})
}

/* Clean */
export const clean = async () => {
	try {
		await fs.remove(path.buildDir);
		console.log(`Cleaned: ${path.buildDir}`);
	} catch (err) {
		console.error(`Error while cleaning: ${err}`);
	}
}

/* HTML */
export const html = () => {
	return gulp.src(path.src.html)
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(prettify({
			indent_size: 1,
			indent_char: '\t',
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(browsersync.stream());
}

/* SCSS */
// для разработки
export const scss = () => {
	return gulp.src(path.src.scss, { sourcemaps: true })
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sassGlob())

		// expanded style.css
		.pipe(gulpSass(sass)({ 
			outputStyle: 'expanded', 
			indentWidth: 1, 
			indentType: 'tab' 
		}))
		.pipe(gulp.dest(path.build.css))

		// minimize style.min.css
		.pipe(gulpSass(sass)({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(path.build.css, { sourcemaps: true }))
		
		.pipe(browsersync.stream());
}
// для продакшн
export const buildcss = () => {
	return gulp.src(path.src.scss)
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sassGlob())

		// expanded style.css
		.pipe(gulpSass(sass)({ 
			outputStyle: 'expanded', 
			indentWidth: 1, 
			indentType: 'tab' 
		}))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(path.build.css))

		// minimize style.min.css
		.pipe(gulpSass(sass)({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(path.build.css))

		.pipe(browsersync.stream());
}

/* JS */
// компиляция script.js
export const js = () => {
	return gulp.src(path.src.js)
		.pipe(plumber(plumberNotify('JS')))
		
		// compile expanded script.js
		.pipe(webpack({
			mode: 'production',
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', { targets: "ie 11" }]]
							}
						}
					},
					{
						test: /\.css$/i,
						use: ['style-loader', 'css-loader'],
					}
				]
			},
			optimization: {
				minimize: false,
			},
			output: {
				filename: 'script.js',
			},
		}))
		.pipe(gulp.dest(path.build.js))

		// minimize script.min.js
		.pipe(webpack({
			mode: 'production',
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', { targets: "ie 11" }]]
							}
						}
					},
					{
						test: /\.css$/i,
						use: ['style-loader', 'css-loader'],
					}
				]
			},
			output: {
				filename: 'script.min.js',
			},
		}))
		.pipe(gulp.dest(path.build.js))

		.pipe(browsersync.stream());
}
// копирование js библиотек
export const jslibs = () => {
	return gulp.src(path.src.jslibs)
		.pipe(gulp.dest(path.build.js))
}

/* Images */
// для разработки
export const copyimages = () => {
	return gulp.src([path.src.images, `!${path.src.svgicons}`], { encoding: false })
		.pipe(plumber(plumberNotify('IMAGES')))
		.pipe(newer(path.build.images))
		.pipe(gulp.dest(path.build.images))
		.pipe(browsersync.stream());
}
// для продакшн
export const minimages = () => {
	return gulp.src([path.src.images, `!${path.src.svgicons}`], { encoding: false })
		.pipe(plumber(plumberNotify('IMAGES')))
		.pipe(newer(path.build.images))
		.pipe(gulpIf(file => {
			return file.extname !== '.svg';
		}, imagemin([
			minpng({quality: [0.6, 0.8], speed: 1}),
			minjpg({quality: 75, progressive: true})
		], {verbose: true})))
		.pipe(gulp.dest(path.build.images))
		.pipe(browsersync.stream());
}

/* SVG sprite */
export const svgicons = () => {
	return gulp.src(path.src.svgicons, { encoding: false })
		.pipe(plumber(plumberNotify('SVG SPRITE', true)))
		.pipe(svgsprite({
			mode: {
				stack: {
					sprite: '../icons.svg',
				}
			}
		}))
		.pipe(gulp.dest(path.build.images))
		.pipe(browsersync.stream());
}

/* Webp */
// конвертация изображений в webp
export const imageswebp = () => {
	return gulp.src([path.src.images, `!${path.src.svgicons}`], { encoding: false })
		.pipe(plumber(plumberNotify('IMAGESWEBP')))
		.pipe(newer(path.build.images))
		.pipe(gulpIf(file => {
			return file.extname !== '.svg';
		}, webpconvert()))
		.pipe(gulp.dest(path.build.images))
		.pipe(browsersync.stream());
}
// добавление webp в html
export const htmlwebp = () => {
	return gulp.src(path.src.html)
		.pipe(plumber(plumberNotify('HTMLWEBP')))
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(webphtml())
		.pipe(prettify({
			indent_size: 1,
			indent_char: '\t',
			unformatted: ['a', 'span']
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(browsersync.stream());
}
// добавление webp в css
export const csswebp = () => {
	return gulp.src(path.src.scss)
		.pipe(plumber(plumberNotify('SCSSWEBP')))
		.pipe(sassGlob())

		// expanded style.css
		.pipe(gulpSass(sass)({ 
			outputStyle: 'expanded', 
			indentWidth: 1, 
			indentType: 'tab' 
		}))
		.pipe(webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		}))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(path.build.css))

		// minimize style.min.css
		.pipe(gulpSass(sass)({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(path.build.css))

		.pipe(browsersync.stream());
}

/* Fonts */
export const fonts = () => {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
}

/* Watcher */
// только для разработки
function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.jslibs, jslibs);
	gulp.watch(path.watch.images, copyimages);
	gulp.watch(path.watch.svgicons, svgicons);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.data, html);
}


/* Run tasks */

// для разработки
const dev = gulp.series(
	clean,
	gulp.parallel(html, scss, js, jslibs, copyimages, svgicons, fonts), 
	gulp.parallel(watcher, server)
);
// для продакшн
const build = gulp.series(
	clean,
	gulp.parallel(htmlwebp, csswebp, js, jslibs, minimages, imageswebp, svgicons, fonts), 
	gulp.parallel(watcher, server)
);
// для продакшн без webp
const nowebp = gulp.series(
	clean,
	gulp.parallel(html, buildcss, js, jslibs, minimages, svgicons, fonts), 
	gulp.parallel(watcher, server)
);


gulp.task('default', dev); // gulp - сборка для разработки (с sourcemaps, без сжатия картинок, без форматирования css и префиксов)
gulp.task('build', build); // gulp build - продакшн версия (без sourcemaps, сжатые картинки, webp, css префиксы, 2 версии css полная и сжатая)
gulp.task('nowebp', nowebp); // gulp nowebp - продакшн версия без webp
gulp.task('clean', clean); // gulp clean - удаляет папку dist