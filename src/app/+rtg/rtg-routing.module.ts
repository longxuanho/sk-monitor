import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtgComponent } from './rtg.component';
import { RtgMonitorComponent } from './rtg-monitor/rtg-monitor.component';
import { RtgErrorsComponent } from './rtg-errors/rtg-errors.component';

const routes: Routes = [
  {
    path: '',
    component: RtgComponent,
    children: [
      { path: '', redirectTo: 'theo-doi-rtg', pathMatch: 'full' },
      { path: 'theo-doi-rtg', component: RtgMonitorComponent },
      { path: 'thong-bao-loi', component: RtgErrorsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtgRoutingModule { }

export const routedComponents = [
  RtgComponent,
  RtgMonitorComponent,
  RtgErrorsComponent
]