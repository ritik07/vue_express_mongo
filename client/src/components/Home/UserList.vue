<template>
  <div class="dis-flex">
    <div class="list-card p-10 m-5">
      <div>
        {{name}}
      </div>
      <div>
        {{email}}
      </div>
      <!-- <ControlledButton color="#fff" background="#277BC0" class="tm-10">
        Send Mail
      </ControlledButton> -->
    </div>
  </div>
</template>

<script>

export default {
  name: "UserList",
  props: {
    name: String,
    email: String
  },
  components: {}
}
</script>

<style>
.list-card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 200px;
}
</style>