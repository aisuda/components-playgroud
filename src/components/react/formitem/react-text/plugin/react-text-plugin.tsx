import {SchemaObject, SchemaType} from 'amis';
import {BasePlugin} from 'amis-editor';

type CustomSchemaType = 'react-text' & SchemaType;

export class ReactTextPlugin extends BasePlugin {
  rendererName = 'custom-react-text-control';
  $schema = '/schemas/UnkownSchema.json';
  name = 'react-text';
  description = 'react-text';
  tags = ['自定义', '表单项'];
  icon = 'fa fa-file-code-o';
  scaffold: SchemaObject = {
    type: 'custom-react-text' as CustomSchemaType,
    label: 'react-text',
    name: 'react-text'
  };
  previewSchema: any = {
    type: 'custom-react-text',
    label: 'react-text'
  };

  panelTitle = '输入框';

  panelControls = [
    {
      type: 'text',
      name: 'value',
      label: '默认值',
      value: ''
    }
  ];
}
