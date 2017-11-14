<template>
  <div id="app">

 <webheader class="navbar"></webheader>
 
  <div  class="container" >

        <router-view></router-view>
  
  </div>
   
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
body  {
  
}

</style>
