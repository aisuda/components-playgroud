import {SchemaObject, SchemaType} from 'amis';
import {BasePlugin, registerEditorPlugin} from 'amis-editor';

type CustomSchemaType = 'custom-react-select' & SchemaType;

export class ReactSelectPlugin extends BasePlugin {
  rendererName = 'custom-react-select-control';
  $schema = '/schemas/UnkownSchema.json';
  name = 'custom-react-select';
  description = 'custom-react-select';
  tags = ['表单项'];
  icon = 'fa fa-square';
  scaffold: SchemaObject = {
    type: 'custom-react-select' as CustomSchemaType,
    label: 'custom-react-select',
    name: 'custom-react-select',
    options: [
      {
        label: 'A',
        value: 'a'
      },
      {
        label: 'B',
        value: 'b'
      },
      {
        label: 'C',
        value: 'c'
      }
    ]
  };
  previewSchema: any = {
    type: 'custom-react-select',
    label: 'custom-react-select'
  };

  panelTitle = '下拉框';

  panelControls = [
    {
      type: 'tpl',
      tpl: '也可以通过自定义模板展示，根据变量 \\${amisUser} 可获取用户数据。'
    }
  ];
}

registerEditorPlugin(ReactSelectPlugin);
