import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { RealtimeToggleBarComponent } from './realtime-toggle-bar/realtime-toggle-bar.component';
import { DatetimeRangeSelectComponent } from './datetime-range-select/datetime-range-select.component';

@NgModule({
  imports: [
    CommonModule,
    InputsModule,
    LabelModule,
    FormsModule,
  ],
  declarations: [
    RealtimeToggleBarComponent,
    DatetimeRangeSelectComponent
  ],
  exports: [
    CommonModule,
    RealtimeToggleBarComponent,
    InputsModule,
    LabelModule,
    DatetimeRangeSelectComponent
  ],
})
export class SharedModule { }
