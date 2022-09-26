<template>
  <div class="controlled-label">
    {{label}}
  </div>
  <input :type="type" class="controlled-input" :style="{width:width}" :required="required" :placeholder="setPlaceHolder"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
  name: "ControlledInput",
  props: [
    'modelValue',
    'required',
    'label',
    'width',
    'type',
  ],
  emits:['update:modelValue'],
  data() {
    return {
      placeholder: ''
    }
  },
  computed: {
    setPlaceHolder() {
      return this.placeholder = "Enter " + this.label
    }
  }
}
</script>

<style>
.controlled-input {
  border: solid 1px rgb(46, 46, 46);
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.controlled-label {
  font-weight: 600;
  margin-bottom: 2px;
  color: rgba(0, 0, 0, 0.88)
}
</style>
