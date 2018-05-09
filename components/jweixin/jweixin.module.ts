import { NgModule, ModuleWithProviders } from '@angular/core';
import { JWeiXinService } from './jweixin.service';
import { LoaderService } from '../utils/loader.service';

@NgModule({
  providers: [JWeiXinService, LoaderService],
})
export class JWeiXinModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: JWeiXinModule, providers: [] };
  }
}
