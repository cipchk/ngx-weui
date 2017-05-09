import { NgModule, LOCALE_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        RoutesModule
    ],
    declarations: [
        AppComponent
    ],
    // providers: [{ provide: LOCALE_ID, useValue: 'zh-cn' }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
