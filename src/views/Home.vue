<template>
  <div>
    <MonsterList />
    <CharacterForm />
  </div>
</template>

<script>
// @ is an alias to /src
import MonsterList from "@/components/encounter-builder/monsters-list.vue";
import CharacterForm from "@/components/encounter-builder/character-form.vue";

export default {
  name: "Home",
  components: {
    MonsterList,
    CharacterForm
  }
};
</script>
