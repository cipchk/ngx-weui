import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';

import { SharedModule } from '../../shared/shared.module';
import { ExampleCoreModule } from '../../example/example.module';
import { AppLayoutComponent } from './pages/layout/layout.component';
import { DocsStartComponent } from './pages/start/start.component';
import { DocsArticleComponent } from './pages/article/article.component';
import { DocsFAQComponent } from './pages/faq/faq.component';
import { DocsNavComponent } from './components/nav/nav.component';

import { MenuService } from './menu.service';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: 'start', component: DocsStartComponent },
            { path: 'components', redirectTo: 'components/actionsheet' },
            { path: 'components/:id', component: DocsArticleComponent },
            { path: 'faq', component: DocsFAQComponent },
            { path: '**', redirectTo: 'start' }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        ExampleCoreModule,
        AngularSplitModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DocsNavComponent, DocViewerComponent,
        AppLayoutComponent, DocsStartComponent, DocsArticleComponent, DocsFAQComponent
    ],
    entryComponents: [DocsNavComponent],
    providers: [MenuService]
})
export class DocsModule { }
