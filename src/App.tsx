import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Editor from './editor/Editor';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import {render} from 'amis';
import {toast} from 'amis/lib/components/Toast';
import {Framework, registerComponents, Usage} from './util';

// jquery
import JqueryText from './components/jquery/formitem/jquery-text/jquery-text';
import JquerySelect from './components/jquery/options/jquery-select/jquery-select';
import HelloJquery from './components/jquery/renderer/hello-jquery/hello-jquery';

// reqct
import ReactText from './components/react/formitem/react-text/react-text';
import ReactSelect from './components/react/options/react-select/react-select';
import HelloReact from './components/react/renderer/hello-react/hello-react';

// vue
import VueText from './components/vue/formitem/vue-text/vue-text';
import VueSelect from './components/vue/options/vue-select/vue-select';
import HelloVue from './components/vue/renderer/hello-vue/hello-vue';

// util
import './util/hello.js';

registerComponents([
  // jquery
  {
    key: 'jquery-text',
    usage: Usage.formitem,
    framework: Framework.jquery,
    component: JqueryText
  },
  {
    key: 'jquery-select',
    usage: Usage.options,
    framework: Framework.jquery,
    component: JquerySelect
  },
  {
    key: 'hello-jquery',
    usage: Usage.renderer,
    framework: Framework.jquery,
    component: HelloJquery
  },

  // react
  {
    key: 'react-text',
    usage: Usage.formitem,
    framework: Framework.react,
    component: ReactText
  },
  {
    key: 'react-select',
    usage: Usage.options,
    framework: Framework.react,
    component: ReactSelect
  },
  {
    key: 'hello-react',
    usage: Usage.renderer,
    framework: Framework.react,
    component: HelloReact
  },

  // vue
  {
    key: 'vue-text',
    usage: Usage.formitem,
    framework: Framework.vue,
    component: VueText
  },
  {
    key: 'vue-select',
    usage: Usage.options,
    framework: Framework.vue,
    component: VueSelect
  },
  {
    key: 'hello-vue',
    usage: Usage.renderer,
    framework: Framework.vue,
    component: HelloVue
  }
]);

const Components = () => (
  <>
    {render(
      {
        type: 'page',
        title: '自定义组件测试',
        body: [
          {
            type: 'wrapper',
            size: 'sm',
            body: {
              type: 'custom-hello-react'
            }
          },

          {
            type: 'form',
            title: 'React 组件',
            controls: [
              {
                type: 'custom-react-text',
                name: 'react-text',
                label: 'React-Text'
              },
              {
                type: 'custom-react-select',
                name: 'react-select',
                label: 'React-Select',
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
              }
            ],
            debug: true,
            mode: 'horizontal'
          },
          {
            type: 'divider'
          },
          {
            type: 'wrapper',
            size: 'sm',
            body: {
              type: 'custom-hello-vue'
            }
          },

          {
            type: 'form',
            title: 'Vue 组件',
            controls: [
              {
                type: 'custom-vue-text',
                name: 'vue-text',
                label: 'Vue-Text'
              },
              {
                type: 'custom-vue-select',
                name: 'vue-select',
                label: 'Vue-Select',
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
              }
            ],
            debug: true,
            mode: 'horizontal'
          },

          {
            type: 'divider'
          },

          {
            type: 'wrapper',
            size: 'sm',
            body: {
              type: 'custom-hello-jquery'
            }
          },
          {
            type: 'form',
            title: 'jquery 组件',
            controls: [
              {
                type: 'custom-jquery-text',
                name: 'jquery-text',
                label: 'jquery-Text'
              },
              {
                type: 'custom-jquery-select',
                name: 'jquery-select',
                label: 'jquery-Select',
                placeholder: '请选择',
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
              }
            ],
            debug: true,
            mode: 'horizontal'
          }
        ]
      },
      {
        theme: 'cxd'
      },
      {
        // env
        // 这些是 amis 需要的一些接口实现
        // 可以参考后面的参数介绍。

        jumpTo: (location: string /*目标地址*/) => {
          // 用来实现页面跳转, actionType:link、url 都会进来。因为不清楚所在环境中是否使用了 spa 模式，所以自己实现吧。
        },

        updateLocation: (
          location: string /*目标地址*/,
          replace: boolean /*是replace，还是push？*/
        ) => {
          // 地址替换，跟 jumpTo 类似
        },

        fetcher: ({
          url, // 接口地址
          method, // 请求方法 get、post、put、delete
          data, // 请求数据
          responseType,
          config, // 其他配置
          headers // 请求头
        }: any) => {
          config = config || {};
          config.withCredentials = true;
          responseType && (config.responseType = responseType);

          if (config.cancelExecutor) {
            config.cancelToken = new (axios as any).CancelToken(
              config.cancelExecutor
            );
          }

          config.headers = headers || {};

          if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) {
              config.params = data;
            }

            return (axios as any)[method](url, config);
          } else if (data && data instanceof FormData) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'multipart/form-data';
          } else if (
            data &&
            typeof data !== 'string' &&
            !(data instanceof Blob) &&
            !(data instanceof ArrayBuffer)
          ) {
            data = JSON.stringify(data);
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
          }

          return (axios as any)[method](url, data, config);
        },
        isCancel: (value: any) => (axios as any).isCancel(value),
        // notify: (
        //   type: 'error' | 'success' /**/,
        //   msg: string /*提示内容*/
        // ) => {
        //   toast[type]
        //     ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
        //     : console.warn('[Notify]', type, msg);
        // },
        // alert,
        // confirm: msg => {
        //   return true;
        // },
        copy: content => {
          copy(content);
          toast.success('内容已复制到粘贴板');
        }
      }
    )}
  </>
);

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Components} />
      <Route path="/editor" component={Editor} />
    </Switch>
  );
}
