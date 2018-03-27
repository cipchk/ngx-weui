import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { WeUiModule } from 'ngx-weui';
import { NotifyModule } from 'ngx-notify';
import { AqmModule } from 'angular-qq-maps';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { JsonpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JsonpModule,
        CoreModule,
        SharedModule,
        RoutesModule,
        LayoutModule,
        WeUiModule.forRoot(),
        NotifyModule.forRoot({
            notify: {
                progress: false
            }
        }),
        AqmModule.forRoot({
            apiKey: 'I3TBZ-QTN3J-MWPFI-FERMS-IBOCQ-LBBWY'
        })
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
