export const columns = [{
  field: "asset",
  title: "Asset",
  width: 150,
  groupable: true,
}, {
  field: "category",
  title: "Phân loại",
  width: 200,
  groupable: true,
}, {
  field: "code",
  title: "Mã lỗi",
  width: 200,
  groupable: true,
  attributes: {
    "class": "text-right"
  }
}, {
  field: "description",
  title: "Mô tả",
  width: 150,
  groupable: false
}, {
  field: "dateRef",
  title: "Thời điểm ghi nhận",
  width: 200,
  groupable: false,
}, {
  field: "currentLoad",
  title: "Tải trọng hiện thời",
  width: 200,
  groupable: false,
  attributes: {
    "class": "text-right"
  }
}];

export const schema = {
  model: {
    fields: {
      asset: { type: "string" },
      category: { type: "string" },
      code: { type: "string" },
      description: { type: "string" },
      dateRef: { type: "string" },
      currentLoad: { type: "number" }
    }
  }
}