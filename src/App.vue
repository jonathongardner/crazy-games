<template>
  <div id="crazy-games">
    <nav-bar id='nav' />
    <router-view id='body' />
    <footer-bar id='footer' />
  </div>
</template>

<script>
import NavBar from '@/components/nav'
import FooterBar from '@/components/footer'
export default {
  name: 'App',
  components: {
    NavBar, FooterBar
  },
}
</script>

<style lang="scss">
#crazy-games {
  font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
  background-color: #9dab9e;
  color: #dcdcdc;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  #nav {
    height: 50px;
  }
  #body {
    flex: 1;
  }
  #footer {
    height: 50px;
  }
}
body {
  margin: 0px;
}
.button-link {
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
</style>
