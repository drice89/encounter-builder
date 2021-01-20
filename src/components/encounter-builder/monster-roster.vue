<template>
    <div class="selected-monsters">
      <h2> Encounter Monsters </h2>
      <v-simple-table dark>
        <thead>
          <td>Id</td>
          <td>Monster Name</td>
          <td>XP value</td>
          <td>Remove</td> 
        </thead>
        <tr v-for="(monster, index) in monsters" :key="index">
          <td>{{index + 1}}</td>
          <td>{{ monster.name }}</td>
          <td>{{ monster.xp }}</td>
          <td><v-btn @click="$emit('remove', monster)">X</v-btn></td>
        </tr>
        <tfoot>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <div> Monster Xp </div>
                  <div> {{ adjustedTotalXp }} </div>
                </span>
              </template>
              <span> Total adjusted xp</span>
            </v-tooltip>
          </td>
          <td> 
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <div>Threshold Xp</div>
                  <div>{{ thresholdXp }}</div>
                </span>
              </template>
              <span>{{thresholdName}}</span>
            </v-tooltip>
          </td>
        </tfoot>
      </v-simple-table>
    </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { DIFFICULTY_THRESHOLD_NAMES } from "../../mixins/rules.js";
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
            },
            currentSelectedThreshold: {
              type: Number,
              default: null
            }
            
        },
        computed: {
          ...mapGetters(["getCurrentThresholdXp"]),
          thresholdXp() {
            return this.getCurrentThresholdXp(this.currentSelectedThreshold)
          },
          thresholdName(){
            return DIFFICULTY_THRESHOLD_NAMES[this.currentSelectedThreshold]
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