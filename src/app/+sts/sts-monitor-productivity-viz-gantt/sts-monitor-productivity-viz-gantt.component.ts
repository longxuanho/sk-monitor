import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;
declare var kendo: any;

@Component({
  selector: 'sk-sts-monitor-productivity-viz-gantt',
  templateUrl: './sts-monitor-productivity-viz-gantt.component.html',
  styleUrls: ['./sts-monitor-productivity-viz-gantt.component.scss']
})
export class StsMonitorProductivityVizGanttComponent implements OnInit, AfterViewInit {

  requestData = [{
    caption: "DNS Lookup",
    elapsed: 20
  }, {
    caption: "Connecting",
    elapsed: 122
  }, {
    caption: "Sending",
    elapsed: 30
  }, {
    caption: "Waiting",
    elapsed: 421
  }, {
    caption: "Receiving",
    elapsed: 357
  }, {
    caption: "Total",
    summary: "total"
  }];

  palette = [
    "#95c3cd", "#abc75b", "#c6816f", "#968cb2", "#c0c0c0", "#2ba6ff"
  ];


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  initializeChart() {
    $("#chart-viz-gantt").kendoChart({
      dataSource: {
        data: this.requestData
      },
      title: {
        text: "Request latency breakdown"
      },
      legend: {
        visible: false
      },
      series: [{
        type: "horizontalWaterfall",
        field: "elapsed",
        categoryField: "caption",
        summaryField: "summary",
        color: (point) => {
          return this.palette[point.index % this.palette.length];
        }
      }],
      axisDefaults: {
        majorGridLines: {
          visible: false
        }
      },
      valueAxis: {
        labels: {
          format: "{0} ms"
        }
      }
    });
  }

}
