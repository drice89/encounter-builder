<template>
  <v-app>
    <v-main>
      <monsters-list />
    </v-main>
  </v-app>
</template>

<script>
import MonstersList from "./components/monsters-list.vue";

export default {
  name: "App",

  components: {
    MonstersList
  },

  data: () => ({
    //
  })
};
</script>
