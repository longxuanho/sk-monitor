import { Component, OnInit } from '@angular/core';

import { StsProductivityLog } from '../../shared/models/sts/sts-productivity-log.model';
import { schema, columns } from '../../shared/models/sts/sts-productivity-grid.model';
import { timeConfig } from '../../core/shared/app-config';
import { LoggerService } from '../../core/shared/logger.service';
import { StsMonitorProductivityService } from '../shared/sts-monitor-productivity.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
declare var kendo: any;
declare var moment: any;

@Component({
  selector: 'sk-sts-monitor-productivity-grid',
  templateUrl: './sts-monitor-productivity-grid.component.html',
  styleUrls: ['./sts-monitor-productivity-grid.component.scss']
})
export class StsMonitorProductivityGridComponent implements OnInit {

  gridReady: boolean;
  gridDataSource: any;
  errorMessage: string = '';
  logSub: Subscription;
  logs: StsProductivityLog[];
  showResetBtn: boolean;

  constructor(
    private stsOperationLoggerService: StsMonitorProductivityService,
    private loggerService: LoggerService,
  ) { }

  

  resetDatabase() {
    this.stsOperationLoggerService.resetDatabase();
  }

  

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeGrid();
  }

  ngOnDestroy() {
    if (this.logSub)
      this.logSub.unsubscribe();
  }

  initializeGrid() {
    this.gridReady = true;
    this.initDataSource();
    this.presentGrid();

    this.logSub = this.stsOperationLoggerService.getLogs()
      .subscribe((data: StsProductivityLog[]) => {
        this.showResetBtn = !!data.length;
        this.errorMessage = '';
        this.logs = data;
        this.gridDataSource.data(data);
      }, error => {
        this.errorMessage = `Có lỗi trong quá trình truy vấn dữ liệu: ${error.message}`;
      });
  }

  initDataSource() {
    this.gridDataSource = new kendo.data.DataSource({
      data: [],
      schema: schema,
      pageSize: 25,
      sort: [
        { field: "start", dir: "desc" }
      ],
    });
  }

  presentGrid() {
    $("#grid").kendoGrid({
      dataSource: this.gridDataSource,
      height: 600,
      groupable: true,
      reorderable: true,
      resizable: true,
      filterable: true,
      sortable: true,
      columnMenu: true,
      selectable: "row",
      change: function (e) {
        var selectedRows = this.select();
        var dataItem = this.dataItem(selectedRows[0]);
        console.log('dataItem: ', dataItem);
      },
      pageable: {
        refresh: false,
        pageSizes: true,
        buttonCount: 5
      },
      toolbar: ["excel"],
      excel: {
        fileName: `Crane Logs - ${moment().format(timeConfig.defaultDateFormat)}.xlsx`,
        filterable: true,
        allPages: true
      },
      columns: columns
    });
  }
}