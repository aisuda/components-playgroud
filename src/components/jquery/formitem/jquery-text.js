// @ts-ignore
import $ from 'jquery';

export default {
  template: `<input id="j_name" />`,

  onMount(props) {
    $('#j_name').attr('name', props.name);
    $('#j_name').on('input', function (e) {
      props.onChange(e.target.value);
    });
  }
};
