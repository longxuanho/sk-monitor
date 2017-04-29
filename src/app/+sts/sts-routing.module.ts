import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StsComponent } from "./sts.component";
import { StsMonitorComponent } from './sts-monitor/sts-monitor.component';
import { StsErrorsComponent } from './sts-errors/sts-errors.component';
import { StsMonitorProductivityGridComponent } from './sts-monitor-productivity-grid/sts-monitor-productivity-grid.component';

const routes: Routes = [
  {
    path: '',
    component: StsComponent,
    children: [
      { path: '', redirectTo: 'nang-suat-lam-hang', pathMatch: 'full' },
      { path: 'nang-suat-lam-hang', component: StsMonitorComponent },
      { path: 'thong-bao-loi', component: StsErrorsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StsRoutingModule { }

export const routedComponents = [
  StsComponent,
  StsMonitorComponent,
  StsErrorsComponent,
  StsMonitorProductivityGridComponent
]