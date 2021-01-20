<template>
    <div class="button-layout">
        <div>
            <v-btn @click="$emit('add-monsters')">Add</v-btn>
        </div>
        <div>
            <v-btn @click="$emit('gen-encounter')">Random Gen</v-btn>
        </div>
        <div>
            <select 
                v-model="threshold" 
                @change="$emit('change-threshold', threshold)"
            >
                <option 
                    v-for="option in Object.keys(difficultyThreshold)" 
                    :key="option" :value="difficultyThreshold[option]" 
                    :label="option.toLowerCase()" 
                />
            </select>
        </div>
    </div>
</template>

<script>
    import { DIFFICULTY_THRESHOLD } from '../../mixins/rules.js';
    export default {
        name: "MonsterButtons",
        data: () => ({
            threshold: DIFFICULTY_THRESHOLD.EASY,
            difficultyThreshold: DIFFICULTY_THRESHOLD
        })
    }
</script>

<style lang="scss" scoped>
    div.button-layout {
        margin: 16px;
        display: flex;
        justify-content: space-evenly;
    }
</style>