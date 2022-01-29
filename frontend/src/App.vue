<template>

    <div class="app-container">
      <img alt="Vue logo" src="./assets/primevue-logo.png">
      <Menu />
      <div class="layout-content">
        <router-view />
      </div>
    </div>

    <Toast/>
</template>

<script>
import Menu from './Menu'

export default {
    data() {
        return {
            message: null,
            text: null
        }
    },
    methods: {
        greet() {
            this.$toast.add({severity: 'info', summary: 'Hello '  + this.text});
            this.message = 'Hello ' + this.text;
        }
    },
    components: {
      Menu
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  text-align: center;
}

body #app .p-button {
  margin-left: .2em;
}

form {
  margin-top: 2em;
}
</style>