import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CellsComponent } from './cells.component';
import { CellsTipsComponent } from './cells-tips.component';
import { CellsTitleComponent } from './cells-title.component';
import { CellComponent } from './cell.component';
import { CellHeaderComponent } from './cell-header.component';
import { CellBodyComponent } from './cell-body.component';
import { CellFooterComponent } from './cell-footer.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        CellsComponent,
        CellsTipsComponent, 
        CellsTitleComponent, 
        CellComponent,
        CellHeaderComponent,
        CellBodyComponent,
        CellFooterComponent
    ],
    exports: [
        CellsComponent, 
        CellsTipsComponent, 
        CellsTitleComponent, 
        CellComponent,
        CellHeaderComponent,
        CellBodyComponent,
        CellFooterComponent
    ]
})
export class CellModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: CellModule, providers: [] };
    }
}
