import fileinclude from "gulp-file-include"; // HTML
import webpHtmlNosvg from "gulp-webp-html-nosvg"
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug"; // PUG

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         })
      ))
       .pipe(fileinclude()) // HTML
      //.pipe(pug({
      //   pretty: true,
      //   verbose: true
      //})) // PUG
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      .pipe(app.plugins.if(
         app.isBuild,
         webpHtmlNosvg()
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         versionNumber({  
         'value': '%DT%',
         'append': {
         'key': '_v',
         'cover': 0,
         'to': [
               'css',
               "js"
            ]
         },
         'output' : {
            'file' : 'version.json'
         }
      })))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
} 