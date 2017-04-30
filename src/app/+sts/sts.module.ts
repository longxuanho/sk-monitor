import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StsRoutingModule, routedComponents } from './sts-routing.module';
import { StsMonitorProductivityService } from './shared/sts-monitor-productivity.service';
import { StsMonitorProductivityVizGanttComponent } from './sts-monitor-productivity-viz-gantt/sts-monitor-productivity-viz-gantt.component';
import { StsErrorsGridComponent } from './sts-errors-grid/sts-errors-grid.component';


@NgModule({
  imports: [
    SharedModule,
    StsRoutingModule,
  ],
  declarations: [
    routedComponents,
    StsMonitorProductivityVizGanttComponent,
    StsErrorsGridComponent,
  ],
  providers: [
    StsMonitorProductivityService
  ]
})
export class StsModule { }
