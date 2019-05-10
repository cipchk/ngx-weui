import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExampleCoreModule } from '../../example/example.module';
import { SharedModule } from '../../shared/shared.module';

import { ExampleContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { MenuService } from './home/menu.service';

export const routes = [{ path: '', component: HomeComponent }, { path: ':id', component: ExampleContainerComponent }];

@NgModule({
  imports: [SharedModule, ExampleCoreModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent, ExampleContainerComponent],
  providers: [MenuService],
})
export class ExampleModule {}
