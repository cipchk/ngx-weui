import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastConfig } from './toast.config';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [ToastService],
  entryComponents: [ToastComponent],
})
export class ToastModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ToastModule, providers: [ToastConfig] };
  }
}
