import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ButtonConfig } from './button.config';
import { ButtonDirective } from './button';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ButtonDirective ],
    exports: [ ButtonDirective ]
})
export class ButtonModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: ButtonModule, providers: [ ButtonConfig ] };
    }
}
