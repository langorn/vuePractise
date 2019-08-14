<template>
  <div id="users">
    
    <h1>Vue JWT Client</h1>
    <form v-on:submit.prevent="onSubmit">
      <input type="email" name="email" v-model="email">
      <input type="password" name="password" v-model="password">
      <input type="submit" name="submit" value="Login">
    </form>
     <button v-on:click="getuser()" >Get user</button >
  </div>
</template>


<script>

import axios from 'axios'

export default {
  data:function(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    onSubmit(){
      axios.post('http://localhost:3000/api/login', {
            email: this.email,
            password: this.password
          })
          .then(res=>{
            alert('xxxx');
            this.$cookie.set('token',res.data.token);
            window.location.href = "/#/users"
          })
          .catch(err=>{
            console.log(err)
          });
    },
    getuser(){
      axios.get('http://localhost:3000/api/users', {
           'headers': { 'Authorization': this.$cookie.get('token') }
          })
          .then(res=>{
            console.log(res);
            if ( !res.data.result ) {

            }
          })
          .catch(err=>{
            console.log(err);
          });
    }
  }
}

</script>