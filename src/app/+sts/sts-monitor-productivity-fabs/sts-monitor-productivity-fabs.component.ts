import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sk-sts-monitor-productivity-fabs',
  templateUrl: './sts-monitor-productivity-fabs.component.html',
  styleUrls: ['./sts-monitor-productivity-fabs.component.scss']
})
export class StsMonitorProductivityFabsComponent implements OnInit {

  @Input() mode: string;
  @Output() displayModeChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeDisplayMode(mode: string) {
    if (!mode)
      return;
    
    this.displayModeChanged.emit(mode);
  }

}
