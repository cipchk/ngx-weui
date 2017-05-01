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
import { DemoActionSheetComponent } from './pages/actionsheet/actionsheet.component';
import { DemoDialogComponent } from './pages/dialog/dialog.component';
import { ArticleComponent } from './pages/article/article.component';
import { FlexComponent } from './pages/flex/flex.component';
import { BadgeComponent } from './pages/badge/badge.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GridComponent } from './pages/grid/grid.component';
import { IconsComponent } from './pages/icons/icons.component';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'button', component: ButtonComponent },
            { path: 'input', component: InputComponent },
            { path: 'list', component: ListComponent},
            { path: 'slider', component: SliderComponent },
            { path: 'uploader', component: DemoUploaderComponent },
            { path: 'actionsheet', component: DemoActionSheetComponent },
            { path: 'dialog', component: DemoDialogComponent },
            { path: 'article', component: ArticleComponent },
            { path: 'flex', component: FlexComponent },
            { path: 'badge', component: BadgeComponent },
            { path: 'footer', component: FooterComponent },
            { path: 'grid', component: GridComponent },
            { path: 'icons', component: IconsComponent }
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
        DemoUploaderComponent,
        DemoActionSheetComponent,
        DemoDialogComponent,
        ArticleComponent,
        FlexComponent,
        BadgeComponent,
        FooterComponent,
        GridComponent,
        IconsComponent
    ],
    entryComponents: [
        PageComponent,
        AccordionComponent
    ],
    exports: [
    ]
})
export class ExampleModule {}
