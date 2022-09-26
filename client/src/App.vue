<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';


export default {
  name: "App",
  components: { Header, Footer }
}
</script>

<style>
  body{
    margin: 0px !important;
  }
</style>
