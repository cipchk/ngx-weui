export const routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'example', pathMatch: 'full' },
            { path: 'example', loadChildren: './example/example.module#ExampleModule' },
            { path: 'docs', loadChildren: './docs/docs.module#DocsModule' },
        ]
    },

    // Not found
    { path: '**', redirectTo: 'example' }
]
