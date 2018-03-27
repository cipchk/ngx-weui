import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ExampleCoreModule } from '../../example/example.module';

import { MenuService } from './home/menu.service';
import { HomeComponent } from './home/home.component';
import { ExampleContainerComponent } from './container/container.component';

export const routes = [
    { path: '', component: HomeComponent },
    { path: ':id', component: ExampleContainerComponent }
];

@NgModule({
    imports: [
        SharedModule,
        ExampleCoreModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ HomeComponent, ExampleContainerComponent ],
    providers: [ MenuService ]
})
export class ExampleModule {}
