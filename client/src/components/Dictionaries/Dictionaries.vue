<template>
    <v-container>
        <v-row v-if="!showSuggestions && this.$vuetify.breakpoint.lgAndUp">
            <v-spacer></v-spacer>
            <v-col>
                <v-card v-if="fetchDicts" class="card" width="500" outlined elevation="1">
                    <v-card-title>
                        <v-text-field outlined v-model="search" append-icon="search" label="Search" single-line
                            hide-details>
                        </v-text-field>
                    </v-card-title>
                    <v-data-table class="mytable" :search="search" fixed-header :headers="headers" :items="dicts"
                        :items-per-page="5" height="300">
                    </v-data-table>
                </v-card>
            </v-col>
            <v-divider vertical v-if="this.$vuetify.breakpoint.lgAndUp"></v-divider>
            <v-col>
                <v-form>
                    <v-card class="elevation-2 card" width="500">
                        <div class="ma-3 inputtext">You can add a new Term or Expression that will be targeted in
                            our
                            tweets search. This new expression will have to be first validated by one of our expert
                            users.</div>
                        <v-card-text>
                            <v-form>
                                <v-text-field label="Suggested Term / Expression" type="text" v-model="newTerm">
                                </v-text-field>
                                <v-select v-model="select" :items="items" label="Choose a Category"
                                    data-vv-name="select" required></v-select>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple" @click="makeSuggestion" :disabled="invalid">
                                <span style="color:#FFFFFF; font-size: 13px"
                                    v-if="!$store.state.auth.isExpert">Suggest</span>
                                <span style="color:#FFFFFF; font-size: 13px" v-if="$store.state.auth.isExpert">Add to
                                    dictionary</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="!showSuggestions && this.$vuetify.breakpoint.mdAndDown" class="mb-5">
            <v-spacer></v-spacer>
            <v-card v-if="fetchDicts" class="card" width="500" outlined elevation="1">
                <v-card-title>
                    <v-text-field outlined v-model="search" append-icon="search" label="Search" single-line
                        hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table class="mytable" :search="search" fixed-header :headers="headers" :items="dicts"
                    :items-per-page="5" height="300">
                </v-data-table>
            </v-card>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="!showSuggestions && this.$vuetify.breakpoint.mdAndDown" class="mb-5">
            <v-spacer></v-spacer>
            <v-form>
                <v-card class="elevation-2 card" width="500">
                    <div class="ma-3 inputtext">You can add a new Term or Expression that will be targeted in
                        our
                        tweets search. This new expression will have to be first validated by one of our expert
                        users.</div>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Suggested Term / Expression" type="text" v-model="newTerm">
                            </v-text-field>
                            <v-select v-model="select" :items="items" label="Choose a Category" data-vv-name="select"
                                required></v-select>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-purple" @click="makeSuggestion" :disabled="invalid">
                            <span style="color:#FFFFFF; font-size: 13px"
                                v-if="!$store.state.auth.isExpert">Suggest</span>
                            <span style="color:#FFFFFF; font-size: 13px" v-if="$store.state.auth.isExpert">Add to
                                dictionary</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="showSuggestions">
            <v-spacer></v-spacer>
            <v-card v-if="fetchSuggs" class="card" width="800" outlined elevation="1">
                <v-data-table :headers="sheaders" :items="suggs" class="elevation-1">
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="addToDict(item)" color="deep-purple">
                            mdi-content-save
                        </v-icon>
                        <v-icon small @click="deleteSuggestion(item)" color="red">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="$store.state.auth.isExpert">
            <v-spacer></v-spacer>
            <v-btn class="mt-3" color="deep-purple" @click="reviewSuggestions">
                <span style="color:#FFFFFF; font-size: 13px" v-if="!showSuggestions">review suggestions</span>
                <span style="color:#FFFFFF; font-size: 13px" v-if="showSuggestions">Show Dictionaries</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import DictionaryService from '../../services/DictionaryService'

export default {
    data() {
        return {
            showSuggestions: false || localStorage.showSuggestions,
            newTerm: '',
            search: '',
            items: ['Gender', 'Sexuality', 'Ethnicity', 'Religion', 'Race', 'Disability'],
            select: null,
            headers: [
                {
                    text: 'Term / Expression',
                    align: 'start',
                    value: 'term',
                },
                { text: 'Catergory', value: 'category' },
            ],
            sheaders: [
                {
                    text: 'Term / Expression',
                    align: 'start',
                    value: 'term',
                },
                { text: 'Catergory', value: 'category' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            dicts: [],
            suggs: []
        }
    },
    computed: {
        async fetchDicts() {
            this.dicts = (await DictionaryService.getDicts()).data
            return this.dicts
        },
        invalid() {
            return !this.select || !this.newTerm
        },
        async fetchSuggs() {
            this.suggs = (await DictionaryService.getSuggs()).data
            return this.suggs
        }
    },
    methods: {
        reviewSuggestions() {
            if (this.showSuggestions) {
                this.showSuggestions = false
                localStorage.removeItem("showSuggestions")
            }
            else {
                this.showSuggestions = true
                localStorage.showSuggestions = true
            }
        },
        async makeSuggestion() {
            if (this.$store.state.auth.isExpert) {
                await DictionaryService.addTerm({ term: this.newTerm.trim().toLowerCase(), category: this.select })
                this.newTerm = ""
                this.select = null
                this.dicts = (await DictionaryService.getDicts()).data
            } else {
                await DictionaryService.addSuggestion({ term: this.newTerm.trim().toLowerCase(), category: this.select })
                this.newTerm = ""
                this.select = null
            }
        },
        async addToDict(item) {
            await DictionaryService.addSuggToDict(item)
            this.suggs = (await DictionaryService.getSuggs()).data
        },
        async deleteSuggestion(item) {
            await DictionaryService.deleteSugg(item)
            this.suggs = (await DictionaryService.getSuggs()).data
        }
    }
}
</script>


<style scoped>
.card {
    border: 2px solid #673AB7;
}

.inputtext {
    font-weight: bold;
}
</style>
