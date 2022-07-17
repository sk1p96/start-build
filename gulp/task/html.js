// Функция по возвращению файлов html

import fileinclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number"; // для кэширования
import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })))
        // .pipe(fileinclude())
        .pipe(pug({
            // Сжатие HTMl файла
            pretty: true,
            // Показывать в терминале какой файл обработан
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}