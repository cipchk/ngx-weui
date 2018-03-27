import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { SharedModule } from '../../../shared/shared.module';
import { DocsComponent } from '../shared/docs/docs.component';
import { ExampleCoreModule } from '../../../example/example.module';

// region: components
{{{imports}}}
const COMPONENTS = [{{{components}}}];

const routes: Routes = [
    {{{routes}}}
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
        DocsComponent,
        ...COMPONENTS
    ]
})
export class {{moduleName}}Module {

}
