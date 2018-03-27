import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DocsArticleComponent } from './article/article.component';

// region: components

const COMPONENTS = [ DocsArticleComponent ];

const routes: Routes = [
    { path: '', redirectTo: 'how' },
    { path: ':id', component: DocsArticleComponent },
];
// endregion

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class DocsModule {

}
