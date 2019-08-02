var gulp = require("gulp");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");
let mincss = require('gulp-minify-css');
let minimg = require('gulp-imagemin');
let connect = require('gulp-connect');
let sass = require('gulp-sass');

gulp.task('watchall',async ()=>{
	gulp.watch("sass/**/*",async ()=>{
		gulp.src("sass/**/*")
		.pipe(sass())
		.pipe(gulp.dest("dist/css"));
	})
	gulp.watch("mmall",async ()=>{
		gulp.src("mmall/**/*")
		.pipe(gulp.dest("dist"));
	})
})

gulp.task('server',async ()=>{
	connect.server({
		root:'dist',
		livereload:true
	})
});