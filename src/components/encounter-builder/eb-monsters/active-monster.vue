<template>
    <div class="active-monster-wrapper">
        <div v-if="!monster">
          <h3>Hover over a monster on the list to see monster details.</h3>
        </div>
        <div v-else-if="loading">
            <sync-loader :loading="loading" :size="'50px'"></sync-loader>
        </div>
        <div v-else>
            <div>Name: {{ monster.name}}</div>
            <div>HP: {{ monster.hit_points}}</div>
            <div>AC: 
                <ol>
                    <li v-for="(entry, index) in monster.armor_class" :key="index">
                        {{  flattenAc(entry) }}
                    </li>
                </ol>
            </div>
            <div>
                Attack
                <div v-for="(action, index) in monster.actions" :key="index">
                <span>Action: {{action.name}}</span>
                <span>Description: {{action.desc}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
    export default {
        name: "ActiveMonster",
        props: {
            monster: {
                type: Object,
                default: null
            }
        },
        components: {
            SyncLoader
        },
        computed: {
            loading() {
                return !this.monster.loaded
            }
        },
        methods: {
            flattenAc(acObject) {
                let str = ""

                let type = acObject["type"]
                let armor = acObject["armor"] && acObject["armor"].map(a => (a["name"])).join(" ")
                let value = acObject["value"]

                if (type) str += type + " "
                if (armor) str += armor + " "
                if (value) str += value + " "

                return str;
            }
        },
        
    }
</script>

<style lang="scss" scoped>
  div.active-monster-wrapper{
    width: 750px;
    margin: 32px 12px 12px;
    overflow-y: auto;
  }
</style>