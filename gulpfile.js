var gulp = require("gulp");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");
let mincss = require('gulp-minify-css');
let minimg = require('gulp-imagemin');
let connect = require('gulp-connect');
let sass = require('gulp-sass');
let babel = require('gulp-babel');

gulp.task('watchall',async ()=>{
	gulp.watch("sass/**/*",async ()=>{
		gulp.src("sass/**/*")
		.pipe(sass())
		.pipe(gulp.dest('mmall\\css'));
	})
	// gulp.watch("mmall",async ()=>{
	// 	gulp.src("mmall/**/*")
	// 	.pipe(gulp.dest("dist"));
	// })
	gulp.watch("mmall/css/*.css",async ()=>{
		gulp.src("mmall/css/*.css")
		.pipe(mincss())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\mmall\\css'));
	})
	gulp.watch("mmall/js/*.js",async ()=>{
		gulp.src("mmall/js/*.js")
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\mmall\\js'));
	})
	gulp.watch("mmall/image/*.{jpg,png}",async ()=>{
		gulp.src("mmall/image/*.{jpg,png}")
		.pipe(minimg())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\mmall\\image'));
	})
	gulp.watch("mmall/demo/*.html",async ()=>{
		gulp.src("mmall/demo/*.html")
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\mmall\\demo'));
	})
	gulp.watch("goodsAndShoppingCart",async ()=>{
		gulp.src("goodsAndShoppingCart/**/*")
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\goodsAndShoppingCart'));
	})
})

// gulp.task('server',async ()=>{
// 	connect.server({
// 		root:'dist',
// 		livereload:true
// 	})
// });