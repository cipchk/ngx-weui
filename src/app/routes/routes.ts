import { DocsStartComponent } from './start/start.component';
import { AppLayoutComponent } from '../layout/default/default.component';
import { IssueComponent } from './issue/issue.component';
import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: DocsStartComponent },
      {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
      },
      { path: 'docs', loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) },
    ],
  },
  { path: 'example', loadChildren: () => import('./example/example.module').then(m => m.ExampleModule) },
  { path: 'issue', component: IssueComponent },
  // Not found
  { path: '**', redirectTo: 'example' },
];
