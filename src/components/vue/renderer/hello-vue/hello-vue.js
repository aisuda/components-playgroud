export default {
  template: '<div>这是一个 {{name}} 自定义组件</div>',

  data: {
    name: 'Vue'
  },

  created() {
    this.foo();
  },

  methods: {
    foo() {
      console.log('foo');
    }
  }
};
