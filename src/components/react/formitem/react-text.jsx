import React from 'react';

export default class Test extends React.PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const onChange = this.props.onChange;
    // 调用amis onChange方法，变更表单项值
    onChange(event.target.value);
  }

  render() {
    // 获取表单项 value 属性
    const {value} = this.props;

    return <input type="text" value={value} onChange={this.handleChange} />;
  }
}
