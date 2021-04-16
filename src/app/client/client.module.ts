import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeModule } from './modules';
import { HeaderComponent } from './core/layouts/header/header.component';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { ClientComponent } from './client.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HomeModule,
    MaterialModule
  ]
})
export class ClientModule { }
