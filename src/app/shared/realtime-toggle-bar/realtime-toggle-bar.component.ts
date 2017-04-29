import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sk-realtime-toggle-bar',
  templateUrl: './realtime-toggle-bar.component.html',
  styleUrls: ['./realtime-toggle-bar.component.scss']
})
export class RealtimeToggleBarComponent implements OnInit {

  @Output() dateTimeRangeSelected = new EventEmitter();
  @Output() realtimeModeToggled = new EventEmitter();

  isRealtime: boolean = true;

  constructor() { }

  handleRealtimeModeToggled() {
    this.realtimeModeToggled.emit(this.isRealtime);
  }

  handleDateTimeRangeSelected(event: {start: string, end: string}) {
    if (!event || !event.start || !event.end)
      return;
    
    this.dateTimeRangeSelected.emit(event);
  }

  ngOnInit() {
  }

}
