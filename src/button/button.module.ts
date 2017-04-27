import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ButtonConfig } from './button.config';
import { ButtonComponent } from './button.component';
import { ButtonAreaComponent } from './button-area.component';
import { ButtonPreviewComponent } from './button-preview.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ButtonComponent, ButtonAreaComponent, ButtonPreviewComponent ],
    exports: [ ButtonComponent, ButtonAreaComponent, ButtonPreviewComponent ]
})
export class ButtonModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: ButtonModule, providers: [ ButtonConfig ] };
    }
}
