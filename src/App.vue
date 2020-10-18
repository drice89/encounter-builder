<template>
  <v-app>
    <v-main>
      
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import { getAllMonsters } from "./util/dnd-api-util.js"

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  }),
  created() {
    getAllMonsters()
      .then( (res) => {
        this.$store.dispatch('setMonsters', res)
        console.log(res)
      })
  }
};
</script>
