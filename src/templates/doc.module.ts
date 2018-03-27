import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

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
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class {{moduleName}}Module {

}
