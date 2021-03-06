import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RoutingComponents,
    SimpleDialogComponent,
    SideNavMenuComponent,
    ConfirmationDialogComponent,
  ],  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
