<template>
  <LoginForm :loading="loading" @update-reset="updateReset" @user-login="userLogin" :reset="reset" />
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue';
import { LoginService } from '../service/login/login'

const loginService = new LoginService()

export default {
  name: "LoginView",
  components: { LoginForm },
  data() {
    return {
      reset: false,
      loading: false
    }
  },
  methods: {
    userLogin(payload, isLogin) {
      if (isLogin) {
        this.loading = true
        loginService.userSignup('http://localhost:5001/users/signin', payload).then((value) => {
          try {
            this.loading = false
            localStorage.setItem('userLoginStatus', true)
            localStorage.setItem('_id', value.data.id)
            this.$router.push('/')
            console.log('value', value)
          } catch (error) {
            this.loading = false
            console.log("error...", error)
          }
        })
      } else {
        this.loading = true
        loginService.userSignup('http://localhost:5001/users/signup', payload).then((value) => {
          try {
            this.loading = false
            localStorage.setItem('userLoginStatus', true)
            this.$router.push('/')
            console.log('value', value)
          } catch (error) {
            this.loading = false
            console.log("error...", error)
          }
        })
      }
      this.reset = true
    },

    updateReset(value) {
      this.reset = value
      console.log('value', value)
    }
  }
}
</script>