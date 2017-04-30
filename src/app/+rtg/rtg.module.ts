import { NgModule } from '@angular/core';
import { RtgRoutingModule, routedComponents } from './rtg-routing.module';

import { SharedModule } from '../shared/shared.module';
import { RtgErrorsGridComponent } from './rtg-errors-grid/rtg-errors-grid.component';

@NgModule({
  imports: [
    SharedModule,
    RtgRoutingModule
  ],
  declarations: [
    routedComponents,
    RtgErrorsGridComponent
  ]
})
export class RtgModule { }
