import React from 'react';
// @ts-ignore
import Vue from 'vue/dist/vue.min';
import {extendObject} from 'amis/lib/utils/helper';
import {registerFormItem, registerOptionsControl, registerRenderer} from 'amis';

export enum Framework {
  react = 0,
  vue = 1,
  jquery = 2
}

export enum Usage {
  renderer = 0,
  formitem = 1,
  options = 2
}

export function registerComponents(
  items: Array<{
    key: string;
    usage: Usage;
    framework: Framework;
    component: any;
  }>
) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    // 其他用法或者被禁用的，直接跳过
    if (item.type === 3) {
      return;
    }

    const registerMap: any = {
      0: registerRenderer,
      1: registerFormItem,
      2: registerOptionsControl
    };

    const resolverMap: any = {
      0: (i: any) => i,
      1: resolveVue,
      2: resolveJquery
    };

    const rendererConfig: any = {
      component: resolverMap[item.framework](item.component)
    };

    item.key = 'custom-' + item.key;

    if (item.type === 0) {
      rendererConfig.test = new RegExp(`(^|\\/)${item.key}$`);
      rendererConfig.weight = -200;
      rendererConfig.name = item.key;
    } else {
      rendererConfig.type = item.key;
      rendererConfig.weight = -item;
      rendererConfig.name = `${item.key}-control`;
    }

    rendererConfig.type = item.key;
    registerMap[item.type](rendererConfig);
  }
}

export const resolveJquery = (jqueryObj: any) => {
  if (
    !jqueryObj ||
    (typeof jqueryObj !== 'function' && typeof jqueryObj !== 'object')
  ) {
    return;
  }

  class JQFactory extends React.Component<any, any> {
    dom: any;
    instance: any;

    constructor(props: any) {
      super(props);
      this.domRef = this.domRef.bind(this);
      this.instance =
        typeof jqueryObj === 'function' ? new jqueryObj() : jqueryObj;
    }

    componentDidMount() {
      const {onMount} = this.instance;
      onMount && onMount.apply(this.instance, [this.props]);
    }

    componentDidUpdate(prevProps: any) {
      const {onUpdate} = this.instance;
      onUpdate && onUpdate.apply(this.instance, [this.props, prevProps]);
    }

    componentWillUnmount() {
      const {onUnmout} = this.instance;
      onUnmout && onUnmout.apply(this.instance, this.props as any);
    }

    domRef(dom: any) {
      this.instance.$root = this.dom = dom;
      this._render();
    }

    _render() {
      if (!this.dom) {
        return;
      }

      let template = this.instance.template;

      if (typeof template === 'string') {
        this.dom.innerHTML = template;
      } else if (typeof template === 'function') {
        this.dom.innerHTML = template(this.props);
      }
    }

    render() {
      return <div ref={this.domRef}></div>;
    }
  }

  return JQFactory;
};

export const resolveVue = (vueObj: any) => {
  if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
    return;
  }

  class VueFactory extends React.Component<any> {
    domRef: any;
    vm: any;

    constructor(props: any) {
      super(props);
      this.domRef = React.createRef();
      this.resolveAmisProps = this.resolveAmisProps.bind(this);
    }

    componentDidMount() {
      const {amisData, amisFunc} = this.resolveAmisProps();

      const {data, ...rest} = (vueObj =
        typeof vueObj === 'function' ? new vueObj() : vueObj);

      // 传入的Vue属性
      this.vm = new Vue({
        data: extendObject(
          amisData,
          typeof data === 'function' ? data() : data
        ),
        ...rest
      });

      Object.keys(amisFunc).forEach(key => {
        const func = amisFunc[key];
        this.vm.$on(
          key,
          (value: any) =>
            func && func(...(Array.isArray(value) ? value : [value]))
        );
      });

      this.domRef.current.appendChild(this.vm.$mount().$el);
    }

    componentWillUnmount() {
      this.vm.$destroy();
    }

    resolveAmisProps() {
      let amisFunc: any = {},
        amisData: any = {};

      Object.keys(this.props).forEach(key => {
        const value = this.props[key];
        if (typeof value === 'function') {
          amisFunc[key] = value;
        } else {
          amisData[key] = value;
        }
      });
      return {amisData, amisFunc};
    }

    componentDidUpdate() {
      Object.keys(this.props).forEach(
        key =>
          typeof this.props[key] !== 'function' &&
          (this.vm[key] = this.props[key])
      );
    }

    render() {
      return <div ref={this.domRef}></div>;
    }
  }

  return VueFactory;
};
