import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { StsErrorLog } from '../../shared/models/sts/sts-error-log.model';
import { schema, columns } from '../../shared/models/sts/sts-error-grid.model';
import { timeConfig } from '../../core/shared/app-config';
import { LoggerService } from '../../core/shared/logger.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
declare var kendo: any;
declare var moment: any;

@Component({
  selector: 'sk-sts-errors-grid',
  templateUrl: './sts-errors-grid.component.html',
  styleUrls: ['./sts-errors-grid.component.scss']
})
export class StsErrorsGridComponent implements OnInit {

  @Output() gridRowSelected = new EventEmitter();
  gridReady: boolean;
  gridDataSource: any;

  showResetBtn: boolean;

  constructor(
    
    private loggerService: LoggerService,
  ) { }

  updateDataSource(data: StsErrorLog[])
  {
    this.gridDataSource.data(data);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.gridReady = true;
    this.initDataSource();
    this.presentGrid();
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
      change: (e) => {
        let grid = $("#grid").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        
        this.gridRowSelected.emit(dataItem);
      },
      pageable: {
        refresh: false,
        pageSizes: true,
        buttonCount: 5
      },
      toolbar: ["excel"],
      excel: {
        fileName: `Sts Error Logs - ${moment().format(timeConfig.defaultDateFormat)}.xlsx`,
        filterable: true,
        allPages: true
      },
      columns: columns
    });
  }
}
