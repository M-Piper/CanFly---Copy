import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { LogbookComponent } from './logbook/logbook.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-flight', component: AddFlightComponent },
  { path: 'logbook', component: LogbookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
