import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ExampleCoreModule } from '../../example/example.module';

import { DocsStartComponent } from './pages/start/start.component';
import { DocsArticleComponent } from './pages/article/article.component';

const routes: Routes = [
    { path: '', component: DocsStartComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ExampleCoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DocsStartComponent, DocsArticleComponent
    ],
    exports: [
    ]
})
export class DocsModule {}
