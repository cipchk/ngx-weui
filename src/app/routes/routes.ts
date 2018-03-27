import { DocsStartComponent } from './start/start.component';
import { AppLayoutComponent } from '../layout/default/default.component';
import { IssueComponent } from './issue/issue.component';

export const routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', redirectTo: 'start', pathMatch: 'full' },
            { path: 'start', component: DocsStartComponent },
            { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
            { path: 'docs', loadChildren: './docs/docs.module#DocsModule' },
        ]
    },
    { path: 'example', loadChildren: './example/example.module#ExampleModule' },
    { path: 'issue', component: IssueComponent },
    // Not found
    { path: '**', redirectTo: 'example' }
];
