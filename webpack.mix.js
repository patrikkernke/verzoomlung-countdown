let mix = require('laravel-mix');


mix.js('resources/app.js', 'public/');
mix.postCss('resources/app.css', 'public/', [
    require('tailwindcss'),
]);

mix.browserSync({
    proxy: 'verzoomlung-countdown.test',
    browser: 'firefox',
    notify: false,
    files: ['public/*']
});