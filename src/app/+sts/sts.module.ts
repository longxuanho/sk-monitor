import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StsRoutingModule, routedComponents } from './sts-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StsRoutingModule,
  ],
  declarations: [
    routedComponents,
  ]
})
export class StsModule { }
