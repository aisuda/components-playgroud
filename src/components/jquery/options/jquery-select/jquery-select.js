import $ from 'jquery';

function syncOptions(selector, options = []) {
  options.forEach(option => {
    $(selector).append(
      `<option value="${option.value}">${option.label}</option>`
    );
  });
}

export default {
  template: `<div>
        <select id="j_select">
            <option value="">请选择...</option>
        </select>
    </div>
    `,

  onMount(props) {
    $('#j_select').attr('name', props.name);
    $('#j_select').attr('placeholder', props.placeholder);
    $('#j_select').on('change', function (e) {
      props.onChange(e.target.value);
    });

    syncOptions('#j_select', props.options);
  },

  onUpdate(props) {
    syncOptions('#j_select', props.options);
  }
};
