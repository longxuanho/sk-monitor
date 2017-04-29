import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { StsMonitorProductivityGridComponent } from '../sts-monitor-productivity-grid/sts-monitor-productivity-grid.component';
import { StsMonitorProductivityService } from '../shared/sts-monitor-productivity.service';
import { StsProductivityLog } from '../../shared/models/sts/sts-productivity-log.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-sts-monitor',
  templateUrl: './sts-monitor.component.html',
  styleUrls: ['./sts-monitor.component.scss']
})
export class StsMonitorComponent implements OnInit, OnDestroy {

  @ViewChild(StsMonitorProductivityGridComponent) grid: StsMonitorProductivityGridComponent;

  isRealtime: boolean = true;
  logSub: Subscription;
  logs: StsProductivityLog[];
  errorMessage: string = '';


  constructor(
    private stsMonitorProductivityService: StsMonitorProductivityService,
  ) { }

  handleDateTimeRangeSelected(event: { start: string, end: string }) {
    if (this.isRealtime)
      return;

    this.unsubscribeRealtimeLogs();
    this.getLogsWithinRange(event.start, event.end);
  }

  handleRealtimeModeToggled(event: boolean) {
    if (this.isRealtime === event)
      return;

    this.isRealtime = event;
    this.unsubscribeRealtimeLogs();

    if (!this.isRealtime)
      this.grid.updateDataSource([]);
    else {
      this.subscribeRealtimeLogs();
    }
  }

  handleGridRowSelected(event: StsProductivityLog) {
    let itemSeleted = this.logs.find((item) => item.asset === event.asset && item.contNum === event.contNum && item.start === item.start && item.end === item.end);
    console.log('Log đã chọn: ', itemSeleted);
  }

  unsubscribeRealtimeLogs() {
    if (this.logSub)
      this.logSub.unsubscribe();
  }

  subscribeRealtimeLogs() {
    this.logSub = this.stsMonitorProductivityService.getLogsRealtime()
      .subscribe((data: StsProductivityLog[]) => {
        this.logs = data;

        if (this.grid)
          this.grid.updateDataSource(this.logs);

      }, error => {
        this.errorMessage = `Có lỗi trong quá trình truy vấn dữ liệu: ${error.message}`;
      });
  }

  getLogsWithinRange(start: string, end: string) {
    this.stsMonitorProductivityService.getLogsWithinRange(start, end)
      .subscribe((data: StsProductivityLog[]) => {
        this.logs = data;

        if (this.grid)
          this.grid.updateDataSource(this.logs);
      });
  }

  ngOnInit() {
    this.subscribeRealtimeLogs();
  }

  ngOnDestroy() {
    this.unsubscribeRealtimeLogs();
  }

}
