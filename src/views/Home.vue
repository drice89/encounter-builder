<template>
  <div>
    <MonsterList />
    <CharacterForm />
    <EncounterTable />
  </div>
</template>

<script>
// @ is an alias to /src
import MonsterList from "@/components/encounter-builder/monsters-list.vue";
import CharacterForm from "@/components/encounter-builder/character-form.vue";
import EncounterTable from "@/components/encounter-builder/encounter-table.vue";

export default {
  name: "Home",
  components: {
    MonsterList,
    CharacterForm,
    EncounterTable
  }
};
</script>
