/**
 * @file 编辑器扩展, 增加自定义组件
 */
import {SchemaObject, SchemaType} from 'amis';
import {BasePlugin, registerEditorPlugin} from 'amis-editor';

type CustomSchemaType = 'custom-vue-text' & SchemaType;

export class VueTextPlugin extends BasePlugin {
  rendererName = 'custom-vue-text-control';
  $schema = '/schemas/UnkownSchema.json';
  name = 'custom-vue-text';
  description = 'custom-vue-text';
  tags = ['表单项'];
  icon = 'fa fa-square';
  scaffold: SchemaObject = {
    type: 'custom-vue-text' as CustomSchemaType,
    label: 'custom-vue-text',
    name: 'custom-vue-text'
  };
  previewSchema: any = {
    type: 'custom-vue-text',
    label: 'custom-vue-text'
  };

  panelTitle = '输入框';

  panelControls = [
    {
      type: 'text',
      name: 'value',
      label: '输入框默认值',
      value: ''
    }
  ];
}

registerEditorPlugin(VueTextPlugin);
