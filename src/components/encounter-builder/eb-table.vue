<template>
  <div>
    <v-data-table 
      :headers="headers" 
      :items="tableItems" 
      item-key="tableKey" 
      dark
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Encounter Table</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <NewEntryDialog/>
        </v-toolbar>
      </template>
      <template v-slot:header.level="{ header }">
        {{ header.text.toUpperCase() }}/CR
      </template>
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
      <template v-slot:item.level="{ item }">
        {{ item.level || item.challenge_rating }}
      </template>
      <template v-slot:item.hp="{ item }">
        {{ item.hp || item.hit_points }}
      </template>
    </v-data-table>
    <v-btn @click="save">Save</v-btn>
    <CharacterForm />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterForm from "./eb-table/character-form.vue"
import NewEntryDialog from "./new-entry-dialoge.vue"
export default {
  name: "EbTable",
  components: {
    CharacterForm,
    NewEntryDialog
  },
  data() {
    return {
      headers: [
        { text: "name", value: "name" },
        { text: "level", value: "level" },
        { text: "hp", value: "hp" },
        { text: "init", value: "init" },
      ],
      numChars: 0,
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["getAllCharactersFromState", "getSelectedMonstersFromState"]),
    tableItems(){
      return this.charItems.concat(this.monItems)
    },
    charItems(){
      let chars = Object.values(this.getAllCharactersFromState)
      chars.forEach(char => {
        char.tableKey = `${char.id+ char.name}`
      })
      return chars
    },
    monItems(){
      let mons = Object.values(this.getSelectedMonstersFromState)
      mons.forEach(mon => {
        mon.tableKey = `${mon.id + mon.index}`
      })
      return mons
    },
  },
  methods: {
    save() {
      localStorage.characters = JSON.stringify(this.getAllCharactersFromState)
    },
  },
}
</script>

<style lang="scss" scoped></style>
