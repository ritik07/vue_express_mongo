<template>
  <button :disabled="disabled" :style="{background:background, color:color, width:width}" class="controlled-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ControlledButton",
  props: {
    background: String,
    color: String,
    width: String,
    disabled: Boolean
  }
}
</script>

<style>
.controlled-button {
  padding: 10px;
  border: none;
}
</style>