<template> 
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="light"
            class="mb-2"
            v-bind="attrs"
            v-on="on"
        >
            Add Character
        </v-btn>
        </template>
        <v-card>
        <v-card-title>
            <span class="headline">Add Character</span>
        </v-card-title>

        <v-card-text>
            <v-container>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.level"
                    label="Level"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.hp"
                    label="Hit Points"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                    v-model="editedItem.init"
                    label="Initative"
                ></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="blue darken-1"
            text
            @click="closeModal"
            >
            Cancel
            </v-btn>
            <v-btn
            color="blue darken-1"
            text
            @click="submitCharacter"
            >
            Save
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "NewEntryDialog",
    data: () => ({
        dialog: false,
        editedItem: {
            name: '',
            level: 0,
            hp: 0,
            init: 0,
        },

    }),
    methods: {
        submitCharacter() {
            let id = this.charactersLength
            this.$store.dispatch("addCharacter", {id, ...this.editedItem});
            this.closeModal
        },
        closeModal(){
            this.editedItem = {
                name: '',
                level: 0,
                hp: 0,
                init: 0,
            },
            this.dialog = false;
        }
    },
  computed: {
    ...mapGetters(["charactersLength"]),
  },
  watch: {
      dialogToggle(){
          this.dialog = this.dialogToggle
      }
  }
}
</script>