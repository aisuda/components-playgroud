import * as React from 'react';
import {Editor} from 'amis-editor';
import {__uri} from 'amis/lib/utils/helper';

// import styles
import 'amis/lib/themes/default.css';
import 'amis-editor/dist/style.css';
import './iconfont/iconfont.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'animate.css/animate.css';
import 'amis/lib/themes/cxd.css';
import './style.scss';

import {ReactTextPlugin} from '../components/react/formitem/react-text/plugin/react-text-plugin';
import {ReactSelectPlugin} from '../components/react/options/react-select/plugin/react-select-plugin';
import {VueTextPlugin} from '../components/vue/formitem/vue-text/plugin/vue-text-plugin';

const schema = {
  type: 'page',
  title: 'Simple Form Page',
  body: [
    {
      type: 'form',
      controls: [
        {
          type: 'custom-react-text',
          name: "react-text",
          label: "React-Text"
        },
        {
          type: "custom-react-select",
          name: "react-select",
          label: "React-Select"
        },
        {
          type: "custom-hello-react",
          name: "hello-react",
          label: "Hello-React"
        }
      ]
    }
  ]
};

const plugins = [ReactTextPlugin, ReactSelectPlugin, VueTextPlugin];

export default class SchemaEditor extends React.Component {
  state = {
    preview: false,
    schema: schema
  };
  handleChange = value => {
    this.setState({
      schema: value
    });
  };
  togglePreview = () => {
    this.setState({
      preview: !this.state.preview
    });
  };
  render() {
    return (
      <div className="cxd-Layout cxd-Layout--noFooter">
        <div className="Editor-header clearfix">
          <div className="Editor-title">amis 可视化编辑器</div>
          <div className="Editor-headerBtns">
            <div
              className={`Editor-headerBtnItem ${
                this.state.preview ? 'is-active' : ''
              }`}
              onClick={this.togglePreview}
            >
              预览
            </div>
          </div>
        </div>
        <div className="cxd-Layout-body Editor-body">
          <div className="Editor-inner">
            <Editor
              preview={this.state.preview}
              value={this.state.schema}
              onChange={this.handleChange}
              className="is-fixed"
              theme="cxd"
              $schemaUrl={`${
                // @ts-ignore
                __uri('amis/schema.json')
              }`}
              iframeUrl="/editor"
            />
          </div>
        </div>
      </div>
    );
  }
}
