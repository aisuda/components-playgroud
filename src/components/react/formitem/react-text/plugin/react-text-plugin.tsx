import {SchemaObject, SchemaType} from 'amis';
import {BasePlugin, getSchemaTpl, registerEditorPlugin} from 'amis-editor';

type CustomSchemaType = 'custom-react-text' & SchemaType;

export class ReactTextPlugin extends BasePlugin {
  rendererName = 'custom-react-text-control';
  $schema = '/schemas/UnkownSchema.json';
  name = 'custom-react-text';
  description = 'custom-react-text';
  tags = ['表单项'];
  icon = 'fa fa-square';
  scaffold: SchemaObject = {
    type: 'custom-react-text' as CustomSchemaType,
    label: 'custom-react-text',
    name: 'custom-react-text'
  };
  previewSchema: any = {
    type: 'custom-react-text',
    label: 'custom-react-text'
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

registerEditorPlugin(ReactTextPlugin);
