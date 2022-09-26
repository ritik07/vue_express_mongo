<template>
  <div class="login-container dis-flex horizontal-center vertical-center">
    <div class="login-card">
      <div class="login-txt bm-15">{{isLogin?"Login":"Signup"}}</div>
      <form @submit="submited">
        <ControlledInput v-if="!isLogin" v-model="name" width="310px" :name="name" :required="true" label="Name" />
        <ControlledInput v-model="email" width="310px" :name="email" :required="true" label="Email" />
        <ControlledInput v-model="password" type="password" width="310px" :name="password" :required="true"
          label="Password" />

        <div class="flex-end">
          <ControlledButton :loading="loading" background="#277BC0" color="#fff" width="80px">
            {{isLogin?'Login':'Signup'}}
          </ControlledButton>
        </div>
        <div @click="toggleLogin" class="cursor-pointer">{{isLogin ?
        `Don't have an account? signup` : "Already have an account? Login"}}</div>
      </form>
    </div>
  </div>
</template>

<script>
import ControlledInput from '@/helper/controls/ControlledInput.vue';
import ControlledButton from '@/helper/controls/ControlledButton.vue';

export default {
  name: "LoginForm",
  components: { ControlledInput, ControlledButton },

  props: ['reset', 'loading'],
  emits: ['update-reset'],

  data() {
    return {
      email: '',
      name: '',
      password: '',
      isLogin: true
    }
  },

  methods: {
    submited(e) {
      e.preventDefault()
      // this.$emit('update-reset', 'ritik here')
      const payload = {
        email: this.email,
        password: this.password
      }
      if (!this.isLogin) {
        payload.name = this.name
      }
      this.$emit('user-login', payload, this.isLogin)
      // e is the form event, e.target is the form, do your things on submit
    },
    toggleLogin() {
      this.isLogin = !this.isLogin
    }
  },

  watch: {
    //side effect of props change
    reset: function (newReset, oldReset) {
      console.log('hereeee')
    }
  },
}
</script>

<style scoped>
.login-container {
  margin: 10px;
  height: 80vh;
}

.login-txt {
  font-size: 30px;
}

.login-card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
}
</style>