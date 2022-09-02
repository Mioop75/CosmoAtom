import webpack from "webpack";
import webpackStream from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: app.isBuild ? "production" : "development",
      devtool: app.isBuild ? false : "source-map",
      entry: {
        main: ['@babel/polyfill', './src/js/app.js'], // js or ts 
      },

      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.m?ts$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', "@babel/preset-typescript"]
              }
            }
          }
        ]
      }
    }), webpack)
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream())
} 