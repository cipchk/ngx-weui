import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';
import { DocsStartComponent } from './start/start.component';
import { IssueComponent } from './issue/issue.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [
        DocsStartComponent,
        IssueComponent
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
