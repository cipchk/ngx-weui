import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    // { path: '', component: DashboardComponent, data: { title: '仪表盘' } }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class DocsModule {}
