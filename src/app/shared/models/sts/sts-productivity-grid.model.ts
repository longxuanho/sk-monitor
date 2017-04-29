export const columns = [{
  field: "asset",
  title: "Phương tiện",
  width: 150,
  groupable: true,
  groupHeaderTemplate: "#= value #: #= kendo.toString(aggregates.duration.sum, 'n0') # (s)"
}, {
  field: "contNum",
  title: "Số Cont",
  width: 150,
  groupable: true,
  groupHeaderTemplate: "Cont #= value #: #= kendo.toString(aggregates.duration.sum, 'n0') # (s)",
}, {
  field: "category",
  title: "Thao tác",
  width: 200,
  groupable: true,
  groupHeaderTemplate: "#= value #: #= kendo.toString(aggregates.duration.sum, 'n0') # (s)"
}, {
  field: "duration",
  title: "Duration (s)",
  width: 150,
  groupable: false,
  aggregates: [ "sum" ],
  attributes: {
    "class": "text-right"
  }
}, {
  field: "start",
  title: "Bắt đầu",
  width: 200,
  groupable: false,
}, {
  field: "end",
  title: "Kết thúc",
  width: 200,
  groupable: false,
}];

export const schema = {
  model: {
    fields: {
      asset: { type: "string" },
      contNum: { type: "string" },
      category: { type: "string" },
      start: { type: "string" },
      end: { type: "string" },
      duration: { type: "number" }
    }
  }
}