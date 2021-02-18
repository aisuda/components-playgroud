import $ from 'jquery';

export default {
  template: `
    <div id="aaa">
        这是个 jquery 按钮 <button id="btn">点我一下</button>
    </div>`,

  onMount(props) {
    $('#btn').click(this.test.bind(this, props));
  },

  test(props) {
    props.onAction(
      null,
      {
        actionType: 'dialog',
        dialog: {
          title: '来个弹框',
          body: 'Bom Bom Bom ${a} ${b}'
        }
      },
      {
        a: 1,
        b: 2
      }
    );
  }
};
