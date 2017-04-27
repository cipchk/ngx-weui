import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
    ],
    providers: [
    ],
    entryComponents: [
    ],
    exports: [
        RouterModule
    ]
})
export class RoutesModule {
}
