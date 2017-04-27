import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { FlexItemComponent } from './flex-item.component';
import { FlexComponent } from './flex.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FlexItemComponent, FlexComponent],
    exports: [FlexItemComponent, FlexComponent]
})
export class FlexModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: FlexModule, providers: [] };
    }
}
