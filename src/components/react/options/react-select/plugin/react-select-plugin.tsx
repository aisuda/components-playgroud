import { BasePlugin } from "amis-editor";

type CustomSchemaType = "custom-react-select";

export class ReactSelectPlugin extends BasePlugin {
  rendererName = "custom-react-select-control";
  $schema = "/schemas/UnkownSchema.json";
  name = "react-select";
  description = "react-select";
  tags = ["自定义", "表单项"];
  icon = "fa fa-file-code-o";
  scaffold: any = {
    type: "custom-react-select" as CustomSchemaType,
    label: "react-select",
    name: "react-select",
    options: [
      {
        label: "A",
        value: "a",
      },
      {
        label: "B",
        value: "b",
      },
      {
        label: "C",
        value: "c",
      },
    ],
  };
  previewSchema: any = {
    type: "custom-react-select",
    label: "react-select",
  };

  panelTitle = "下拉框";

  panelControls = [
    {
      type: "tpl",
      tpl: "也可以通过自定义模板展示，根据变量 \\${amisUser} 可获取用户数据。",
    },
  ];
}
