export default {
  // name 和 value 用的是 amis 配置项中的 name 和 value
  template: `
        <select v-model="value">
            <option v-for="option in options" :value="option.value">
                {{option.label}}
            </option>
        </select>
    `,

  watch: {
    value: function (newValue, oldValue) {
      // 通过 $emit 可以触发 amis 的 onToggle 事件，进行表单项的修改
      const option = this.options.find(o => o.value === newValue);
      this.$emit('onToggle', option);
    }
  }
};
