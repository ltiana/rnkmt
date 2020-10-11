<template>
    <div>
        <b-button variant="outline-success" v-if="!show" @click="showForm">Add hieroglypg</b-button>

        <b-card class="mt-3" header="Add a hieroglyph" v-if="show">
            <b-form @submit="onSubmit" @reset="onReset" >
                <b-row>
                    <b-col>
                        <b-form-file
                            v-model="form.file"
                            :state="Boolean(form.file)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            required
                        ></b-form-file>
                    </b-col>
                </b-row>
                <b-row>
                    <div>
                        
                    </div>
                </b-row>

                <b-row>
                    <b-col>
                        <b-input-group>
                            <template v-slot:prepend>
                                <b-input-group-text variant="outline-info">Gardiner</b-input-group-text>
                            </template>
                            <b-form-select
                                id="input-gardiner"
                                v-model="form.gardiner"
                                :options="gardiner"
                                :state="Boolean(form.gardiner)"
                                required
                            ></b-form-select>

                            <b-form-input
                                id="input-number"
                                v-model="form.number"
                                type="number"
                                required
                                :state="Boolean(form.number)"
                                placeholder="Enter number"
                            ></b-form-input>
                        </b-input-group>                       
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-input-group>
                            <template v-slot:prepend>
                                <b-input-group-text >Size</b-input-group-text>
                            </template>

                            <b-form-select
                                id="input-width"
                                v-model="form.width"
                                :options="width"
                            ></b-form-select>

                            <b-form-select
                                id="input-height"
                                v-model="form.height"
                                :options="height"
                            ></b-form-select>
                        </b-input-group>                       
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group id="input-group-description" label="Description" label-for="input-description">
                            <b-form-input
                            id="input-description"
                            v-model="form.description"
                            required
                            placeholder="Enter hieroglyph description"
                            ></b-form-input>
                        </b-form-group>                      
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group id="input-group-notes" label="Notes" label-for="input-notes">
                            <b-form-input
                            id="input-notes"
                            v-model="form.notes"
                            placeholder=""
                            ></b-form-input>
                        </b-form-group>                        
                    </b-col>
                </b-row>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </b-card>

    </div>
</template>

<script>
export default {
    name: "HieroglyphAdd",
    data() {
        return {
            "show": true,
            "form":{
                "file": null, 
                "gardiner": null,
                "number": null,
                "height": null,
                "width": null,
                "description": "",
                "notes": ""
            },
            "height": [{ value: null, text: 'Select hight (optional)' },"tall", "low"],
            "width": [{ value: null, text: 'Select width (optional)' },"thin", "narrow", "broad"],
            "gardiner": [{ value: null, text: "Select group in Gardienr's list" }, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Aa"]


            
        }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        this.show = false
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.file = null;
        this.form.gardiner = null;
        this.form.number = null;
        this.form.width = null;
        this.form.height = null;
        this.form.description = "";
        this.form.notes = "";
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      showForm() {
        this.form.file = null;
        this.form.gardiner = null;
        this.form.number = null;
        this.form.width = null;
        this.form.height = null;
        this.form.description = "";
        this.form.notes = "";

        this.show = true;
      }
    }
}
</script>