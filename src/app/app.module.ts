import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AqmModule } from 'angular-qq-maps';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    RoutesModule,
    LayoutModule,
    ToastrModule.forRoot(),
    AqmModule.forRoot({
      apiKey: 'I3TBZ-QTN3J-MWPFI-FERMS-IBOCQ-LBBWY',
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
