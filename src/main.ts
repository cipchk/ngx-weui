// tslint:disable-next-line: no-import-side-effect
import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// tslint:disable-next-line: no-import-side-effect
import './app/core/preloader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if ((window as any).appBootstrap) {
      (window as any).appBootstrap();
    }
  });
