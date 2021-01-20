<template>
    <div class="selected-monsters">
      <h2> Encounter Monsters </h2>
      <v-simple-table dark>
        <thead>
          <td>Monster Name</td>
          <td>XP value</td>
          <td>Remove</td> 
        </thead>
        <tr v-for="(monster, index) in monsters" :key="index">
          <td>{{ monster.name }}</td>
          <td>{{ monster.xp }}</td>
          <td><v-btn @click="$emit('remove', monster)">X</v-btn></td>
        </tr>
        <tfoot>
          <td>
            Total Monsters: {{ monsters.length }}
          </td>
          <td>
            Total Adjusted Xp: {{ adjustedTotalXp }}
          </td>
        </tfoot>
      </v-simple-table>
    </div>
</template>

<script>
    export default {
        name: "MonsterRoster",
        props: {
            monsters: {
                type: Array,
                default: null
            },
            adjustedTotalXp: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
  .selected-monsters {
    width: 500px;
    height: 400px;
    padding: 16px;
    overflow-y: auto;
  }
</style>