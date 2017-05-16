import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SidebarContainerComponent, SidebarComponent, CloseSidebarDirective, SidebarService, SidebarConfig } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ SidebarContainerComponent, SidebarComponent, CloseSidebarDirective ],
    exports: [ SidebarContainerComponent, SidebarComponent, CloseSidebarDirective ],
    providers: [ SidebarService ]
})
export class SidebarModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: SidebarModule, providers: [ SidebarConfig ] };
    }
}
