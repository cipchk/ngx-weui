import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { PageComponent } from './component/page.component';
import { AccordionComponent } from "./component/accordion.component";

import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonComponent } from './pages/button/button.component';
import { ListComponent } from './pages/list/list.component';
import { InputComponent } from './pages/input/input.component';
import { SliderComponent } from './pages/slider/slider.component';
import { DemoUploaderComponent } from './pages/uploader/uploader.component';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent, data: { title: 'ngx-weui' } },
            { path: 'button', component: ButtonComponent, data: { title: 'button' } },
            { path: 'input', component: InputComponent, data: { title: 'input' } },
            { path: 'list', component: ListComponent, data: { title: 'list' } },
            { path: 'slider', component: SliderComponent, data: { title: 'slider' } },
            { path: 'uploader', component: DemoUploaderComponent, data: { title: 'uploader' } }
        ]
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PageComponent,
        AccordionComponent,

        LayoutComponent,
        HomeComponent,
        ButtonComponent,
        InputComponent,
        ListComponent,
        SliderComponent,
        DemoUploaderComponent
    ],
    entryComponents: [
        PageComponent,
        AccordionComponent
    ],
    exports: [
    ]
})
export class ExampleModule {}
