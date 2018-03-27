module.exports = {
    theme: {
        github: 'https://github.com/cipchk/ngx-weui',
        defaultLang: 'zh-CN',
        langs: [ 'zh-CN', 'en-US' ]
    },
    modules: [
        {
            name: 'components',
            src: './components/',
            template: {
                meta: './src/templates/meta.ts'
            },
            dist: './src/app/routes/components',
            ignores: [ 'utils' ]
        },
        {
            name: 'docs',
            src: './docs/',
            template: {
                meta: './src/templates/meta.ts'
            },
            dist: './src/app/routes/docs'
        }
    ]
};
