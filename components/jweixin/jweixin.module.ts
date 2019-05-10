import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoaderService } from 'ngx-weui/core';
import { JWeiXinService } from './jweixin.service';

@NgModule({
  providers: [JWeiXinService, LoaderService],
})
export class JWeiXinModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: JWeiXinModule, providers: [] };
  }
}
