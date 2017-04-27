import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from "./button/button.module";
import { FlexModule } from "./flex/flex.module";
import { CellModule } from "./cell/cell.module";
import { FormModule } from "./form/form.module";

export { ButtonComponent, ButtonAreaComponent, ButtonPreviewComponent, ButtonConfig, ButtonModule } from './button';
export { FlexItemComponent, FlexComponent, FlexModule } from './flex';
export { CellsComponent, CellsTipsComponent, CellsTitleComponent, 
         CellComponent, CellHeaderComponent, CellBodyComponent, CellFooterComponent,
         CellModule } from './cell';
export { FormComponent, FormCellComponent, RadioComponent, 
         FormModule} from './form';

const MODULES = [
    ButtonModule, FlexModule, CellModule, FormModule
];

@NgModule({
    imports: [
        ButtonModule.forRoot(), FlexModule.forRoot(), CellModule.forRoot(),
        FormModule.forRoot()
    ],
    exports: MODULES
})
export class WeUiRootModule {
}

@NgModule({ exports: MODULES })
export class WeUiModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: WeUiRootModule };
    }
}
