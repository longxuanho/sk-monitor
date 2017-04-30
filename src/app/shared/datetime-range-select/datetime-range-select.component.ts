import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { timeConfig } from '../../core/shared/app-config';

declare var kendo: any;
declare var $: any;
declare var moment: any;

@Component({
  selector: 'sk-datetime-range-select',
  templateUrl: './datetime-range-select.component.html',
  styleUrls: ['./datetime-range-select.component.scss']
})
export class DatetimeRangeSelectComponent implements OnInit, AfterViewInit {

  @Output() dateTimeRangeSelected = new EventEmitter();

  dateTimeDisplayFormat = "dd/MM/yyyy HH:mm:ss";
  dateTimeOutputFormat = timeConfig.defaultDateTimeFormat;
  startDateSelector;
  endDateSelector;

  constructor() { }

  ngOnInit() {
  }

  acceptRange() {
    if (!this.startDateSelector || !this.endDateSelector)
      return;

    this.dateTimeRangeSelected.emit({
      start: moment(this.startDateSelector.value()).format(this.dateTimeOutputFormat),
      end: moment(this.endDateSelector.value()).format(this.dateTimeOutputFormat)
    });

  }

  ngAfterViewInit() {
    this.initializeSelectors();
  }

  initializeSelectors() {
    let today = kendo.toString(new Date(), this.dateTimeDisplayFormat)

    this.startDateSelector = $("#startDateTime").kendoDateTimePicker({
      value: today,
      change: () => {
        var startDate = this.startDateSelector.value(),
          endDate = this.endDateSelector.value();

        if (startDate) {
          startDate = new Date(startDate);
          startDate.setDate(startDate.getDate());
          this.endDateSelector.min(startDate);
        } else if (endDate) {
          this.startDateSelector.max(new Date(endDate));
        } else {
          endDate = new Date();
          this.startDateSelector.max(endDate);
          this.endDateSelector.min(endDate);
        }
      },
      format: this.dateTimeDisplayFormat,
      timeFormat: "HH:mm",
      parseFormats: [this.dateTimeDisplayFormat]
    }).data("kendoDateTimePicker");

    this.endDateSelector = $("#endDateTime").kendoDateTimePicker({
      value: today,
      change: () => {
        var endDate = this.endDateSelector.value(),
          startDate = this.startDateSelector.value();

        if (endDate) {
          endDate = new Date(endDate);
          endDate.setDate(endDate.getDate());
          this.startDateSelector.max(endDate);
        } else if (startDate) {
          this.endDateSelector.min(new Date(startDate));
        } else {
          endDate = new Date();
          this.startDateSelector.max(endDate);
          this.endDateSelector.min(endDate);
        }
      },
      format: this.dateTimeDisplayFormat,
      timeFormat: "HH:mm",
      parseFormats: [this.dateTimeDisplayFormat]
    }).data("kendoDateTimePicker");

    $("#doneButton").kendoButton({
      icon: "check"
    });
  }

}
