import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppLayoutComponent } from './default/default.component';

const COMPONENTS = [
    AppLayoutComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class LayoutModule { }
