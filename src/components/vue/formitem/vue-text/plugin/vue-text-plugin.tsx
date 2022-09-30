/**
 * @file 编辑器扩展, 增加自定义组件
 */
import { BasePlugin } from "amis-editor";

type CustomSchemaType = "custom-vue-text";

export class VueTextPlugin extends BasePlugin {
  rendererName = "custom-vue-text-control";
  $schema = "/schemas/UnkownSchema.json";
  name = "vue-text";
  description = "vue-text";
  tags = ["自定义", "表单项"];
  icon = "fa fa-file-code-o";
  scaffold: any = {
    type: "custom-vue-text" as CustomSchemaType,
    label: "vue-text",
    name: "vue-text",
  };
  previewSchema: any = {
    type: "custom-vue-text",
    label: "vue-text",
  };

  panelTitle = "输入框";

  panelControls = [
    {
      type: "text",
      name: "value",
      label: "输入框默认值",
      value: "",
    },
  ];
}
