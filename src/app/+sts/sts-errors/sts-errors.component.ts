import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-sts-errors',
  templateUrl: './sts-errors.component.html',
  styleUrls: ['./sts-errors.component.scss']
})
export class StsErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleDateTimeRangeSelected(event: { start: string, end: string }) {

  }

  handleRealtimeModeToggled(event: boolean) {

  }

}
