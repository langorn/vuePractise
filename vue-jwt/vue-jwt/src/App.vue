<template>
  <div id="app">

    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/users'">About</router-link>
    <router-link v-bind:to="'/login'">Login</router-link>

    <router-view>
    </router-view>
  </div>
</template>

<script src="./src/main.js"></script>

<script>
    import UserName from './components/UserName.vue'
    import login from './components/login.vue'
    export default {
      name: 'app',
      components:{
          UserName,
          login
      }
    }
</script>