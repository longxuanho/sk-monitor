import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StsRoutingModule, routedComponents } from './sts-routing.module';
import { StsMonitorProductivityService } from './shared/sts-monitor-productivity.service';

@NgModule({
  imports: [
    SharedModule,
    StsRoutingModule,
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
    StsMonitorProductivityService
  ]
})
export class StsModule { }
