<template>
  <div class="navbar">
    <div class="dis-flex justify-content-sb">
      <div class="logo">
        Bulk mailer
      </div>
      <div class="profile-avtr" v-show="this.$router.path !=='/login' ">
        <Avatar @click="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '../common/Avatar.vue';
export default {
  name: "Header",
  components: { Avatar },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.navbar {
  padding: 15px;
  background: #277BC0;
}

.logo {
  font-size: 30px;
  color: #fff;
}

.justify-content-sb {
  justify-content: space-between;
}

.dis-flex {
  display: flex;
}
</style>