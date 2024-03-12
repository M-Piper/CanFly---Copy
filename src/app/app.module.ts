import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './landing/landing.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { LogbookComponent } from './logbook/logbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({

  declarations: [
    AppComponent,
    LayoutComponent,
    LandingComponent,
    AddFlightComponent,
    LogbookComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  //exports: [FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
