import { NgModule } from '@angular/core';
import { RtgRoutingModule, routedComponents } from './rtg-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RtgRoutingModule
  ],
  declarations: [
    routedComponents
  ]
})
export class RtgModule { }
