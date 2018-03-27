import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../shared/shared.module';
import { ArticleComponent } from './article/article.component';
import { ExampleCoreModule } from '../../example/example.module';

// region: components

const COMPONENTS = [ ArticleComponent ];

const routes: Routes = [
    { path: '', redirectTo: 'button' },
    { path: ':id', component: ArticleComponent },
];
// endregion

@NgModule({
    imports: [
        SharedModule,
        AngularSplitModule,
        ExampleCoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class ComponentsModule {

}
