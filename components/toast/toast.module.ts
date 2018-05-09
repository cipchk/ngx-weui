import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastConfig } from './toast.config';

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
