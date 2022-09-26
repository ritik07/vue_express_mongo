<template>
  <div class="home-container">
    <div v-if="!loading" class="home">
      <div class="dis-flex flex-wrap">
        <div v-for="user in allUsers">
          <UserList :name="user.name" :email="user.email" />
        </div>
      </div>
    </div>
    <div v-else>
      LOADING...
    </div>

    <div :v-show="!loading" class="dis-flex horizontal-center tm-10">
      <ControlledButton color="#fff" background="#000" class="rm-5" @click="subscribe">
        {{isSubscribe}}
      </ControlledButton>

      <ControlledButton color="#000" class="btn-border-black" background="#fff" @click="braodcastMail">
        Broadcast mail
      </ControlledButton>
    </div>

    <!-- error -->
    <div v-if="error">
      {{error}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { UserService } from '../service/user/user'
import UserList from '@/components/Home/UserList.vue'
import ControlledButton from '@/helper/controls/ControlledButton.vue'

const user_service = new UserService

export default {
  name: 'HomeView',
  components: {
    UserList,
    ControlledButton
  },

  data() {
    return {
      allUsers: false,
      loading: false,
      error: false
    }
  },

  methods: {
    async getTask() {
      this.loading = true
      try {
        this.allUsers = await (await user_service.getAllUsers('http://localhost:5001/users/getAllUser')).data.data
        this.loading = false
      } catch (error) {
        console.log("error...", error)
        this.loading = false
        this.error = error.response.data
      }
    },

    async subscribe() {
      try {
        await user_service.subscribeNewsletter('http://localhost:5001/users/subscribenewsletter', localStorage.getItem('_id'))
        localStorage.setItem('subscribe', true)
      } catch (error) {
        console.log("error...", error)
        this.error = error.response.data
      }
    },

    async braodcastMail() {
      try {
        await user_service.bulkMail('http://localhost:5001/users/sendEmailToUsers')
      } catch (error) {
        console.log("error...", error)
        this.error = error.response.data
      }
    }

  },


  computed: {
    isSubscribe() {
      if (localStorage.getItem('subscribe')) {
        return 'Subscribed'
      } else {
        return 'Subscribe newsletter'
      }
    }
  },

  created() {
    this.getTask()
  },
}
</script>

<style>
.home-container {
  margin: 20px;
}

.btn-border-black {
  border: 2px solid #000;
}
</style>
