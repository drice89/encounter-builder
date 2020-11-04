<template>
    <div>
        <form @submit.prevent="submitCharacter">
            <label for="char-name">Character Name</label>
            <input :name="char-name" type="text" v-model="name"/>
            <label for="char-level">Character Level</label>
            <input type="text" :name="char-level" v-model="level" />
            <label for="init">HP</label>
            <input type="text" :name="hp" v-model="hp" />
            <label for="init">Initiative Value</label>
            <input type="text" v-model="init" :name="init" />
            <input type="submit">
        </form>
        <v-data-table
            :headers = "headers"
            :items = "characters"
            item-key = "name"
        >
            <!-- <li v-for="(character, index) in characters" :key="index">
                {{ character.name }}
            </li> -->
        </v-data-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: null,
                level: null,
                hp: null,
                init: null,
                characters: this.$store.state.characters,
                headers: [
                        { text: 'name', value: 'name' },
                        { text : 'level', value: 'level'},
                        { text: 'hp', value: 'hp' },
                        { text: 'init', value: 'init' },
                    ]
            }
        },
        methods: {
            submitCharacter() {
                this.$store.dispatch("addCharacter", this.characterObject)
            }
        },
        computed: {
            characterObject() {
               return {
                    name: this.name,
                    level: this.level,
                    hp: this.hp,
                    init: this.init,
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>