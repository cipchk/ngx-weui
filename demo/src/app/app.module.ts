import { NgModule } from '@angular/core';
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
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
