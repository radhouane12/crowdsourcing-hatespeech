<template>
    <v-card>
        <v-toolbar flat color="deep-purple">
            <v-tabs v-model="tabs" fixed-tabs>
                <v-tabs-slider color="#FFFFFF"></v-tabs-slider>
                <v-tab to="#login" class="primary--text">
                    <span style="color:#FFFFFF">Log In</span>
                </v-tab>
                <v-tab to="#signup" class="primary--text">
                    <span style="color:#FFFFFF">Sign Up</span>
                </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
            <v-tab-item value='login'>
                <v-form>
                    <v-card class="elevation-12" style="background-color:#E6E6FA">
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="person" label="Username" type="text" v-model="username">
                                </v-text-field>
                                <v-text-field id="password" prepend-icon="lock" label="Password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1" hint="At least 8 characters" v-model="password">
                                </v-text-field>
                                <div v-if="errorlogin" style="color:red;">{{ errorlogin }}</div>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-checkbox class="mb-2 ml-5" v-model="rememberMe" label="Remember me" type="checkbox">
                            </v-checkbox>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple" @click="login">
                                <span style="color:#FFFFFF; font-size: 13px">Log in</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-tab-item>
            <v-tab-item value='signup' style="background-color:#E6E6FA">
                <validation-observer ref="observer" v-slot="{ invalid }">
                    <form class="ma-3" @submit.prevent="submit">
                        <v-layout row class="ma-3">
                            <v-flex xs12 md5>
                                <validation-provider v-slot="{ errors }" name="Username" rules="required">
                                    <v-text-field v-model="registerUsername" :error-messages="errors" label="Username"
                                        required></v-text-field>
                                </validation-provider>
                                <div v-if="error" class="mb-4" style="color:red;">{{ error }}</div>
                            </v-flex>
                            <v-flex></v-flex>
                            <v-flex xs12 md5>
                                <validation-provider v-slot="{ errors }" name="Password" rules="required|min:8">
                                    <v-text-field v-model="registerPassword" :error-messages="errors" label="Password"
                                        required hint="At least 8 characters"
                                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show ? 'text' : 'password'" @click:append="show = !show">
                                    </v-text-field>
                                </validation-provider>
                            </v-flex>
                            <v-flex xs0 md3></v-flex>
                            <v-flex xs12 md6>
                                <validation-provider v-slot="{ errors }" name="Birth year" rules="required|numeric|birthyear">
                                    <v-text-field v-model="birthyear" placeholder="YYYY" :error-messages="errors" label="Birth year"
                                        required></v-text-field>
                                </validation-provider>
                            </v-flex>
                            <v-flex xs0 md3></v-flex>
                            <v-flex xs12 md4>
                                <validation-provider v-slot="{ errors }" name="Gender" rules="required">
                                    <v-select v-model="selectedGender" :items="gender" :error-messages="errors"
                                        label="Gender" required></v-select>
                                </validation-provider>
                            </v-flex>
                            <v-flex></v-flex>
                            <v-flex xs12 md7>
                                <validation-provider v-slot="{ errors }" name="Level of education" rules="required">
                                    <v-select v-model="selectedEducation" :items="education" :error-messages="errors"
                                        label="Level of education" required>
                                    </v-select>
                                </validation-provider>
                            </v-flex>
                            <v-flex xs12 md6>
                                <validation-provider v-slot="{ errors }" name="Profession" rules="required">
                                    <v-text-field v-model="profession" :error-messages="errors" label="Profession"
                                        required></v-text-field>
                                </validation-provider>
                            </v-flex>
                            <v-flex></v-flex>
                            <v-flex xs12 md5>
                                <validation-provider v-slot="{ errors }" name="Annual Income" rules="required|decimal">
                                    <v-text-field v-model="annualIncome" :error-messages="errors" prefix="€"
                                        hint="Only numbers are allowed" label="Annual Income" required></v-text-field>
                                </validation-provider>
                            </v-flex>

                            <v-flex xs12 md5>
                                    <v-select v-model="nationality" :items="nationalities"
                                        label="Nationality (optional)" required>
                                    </v-select>
                            </v-flex>
                            <v-flex></v-flex>
                            <v-flex xs12 md5>
                                <validation-provider v-slot="{ errors }" name="Country of Residence" rules="required">
                                    <v-select v-model="residence" :items="nationalities" :error-messages="errors"
                                        label="Country of Residence" required>
                                    </v-select>
                                </validation-provider>
                            </v-flex>
                            <v-row xs12 md7>
                                <v-spacer></v-spacer>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-checkbox small v-on="on" v-model="expert"
                                            label="I want to be an expert user"></v-checkbox>
                                    </template>
                                    <span>Expert users are bla bla</span>
                                </v-tooltip>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-flex xs12 md12>
                                <div class="mb-4"><a href="#" @click.prevent="what = true">What is an expert user ?</a>
                                </div>
                            </v-flex>
                            <v-flex xs12 md12>
                                <div class="mb-4"><a href="#" @click.prevent="why = true">Why we require
                                        this information ?</a></div>
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-btn color="deep-purple" @click="clear" outlined>
                                    <span style="color:#673AB7">clear</span>
                                </v-btn>
                                <v-btn color="deep-purple" class="mr-4" type="submit" :disabled="invalid" absolute right
                                    @click="register">
                                    <span style="color:#FFFFFF">Register</span>
                                </v-btn>
                            </v-flex>
                            <v-dialog v-model="why" width="70%">
                                <v-card>
                                    <v-card-title class="text-h6">
                                        Why we require this information
                                    </v-card-title>
                                    <v-card-text>
                                        This demographical information helps us with insights about our annotators,
                                        making our dataset flexible and making it possible to see any user bias in the
                                        dataset as well as the possible elimination of such biases by creating
                                        sub-datasets.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="purple" @click="why = false">
                                            Ok
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="what" width="70%">
                                <v-card>
                                    <v-card-title class="text-h6">
                                        Expert users
                                    </v-card-title>
                                    <v-card-text>
                                        Are considered a cornerstone of this platform. They have access to multiple
                                        features that could impact the effectiveness of the platform. They are
                                        responsible for assessing flags and suggestions raised by regular users and
                                        their annotations weigh twice as much as the regulars'.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="purple" @click="what = false">
                                            Ok
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                    </form>
                </validation-observer>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
<script>
import { required, min, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import AuthenticationService from '@/services/AuthenticationService'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('min', {
    ...min,
    message: '{_field_} may not be shorter than {length} characters',
})

extend('numeric', {
    ...numeric,
    message: '{_field_} may only contain numbers',
})

extend("birthyear", {
  validate: (value, args) => {
    return {
      valid:  value <= new Date().getFullYear() && value > 1900,
    };
  },
  message: "You can't possibly be that old or born in the future"
})

extend("decimal", {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
    const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

    return {
      valid: regex.test(value),
    };
  },
  message: 'The {_field_} field must contain only numbers. Make sure to use . as a decimal sparator'
})


export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        tabs: null,

        username: localStorage.username || "",
        password: '',
        show: false,
        rememberMe: localStorage.rememberMe || true,

        registerUsername: '',
        registerPassword: '',
        show1: false,
        selectedGender: null,
        gender: [
            'Male',
            'Female',
            'Divers',
        ],
        birthyear: null,
        profession: '',
        annualIncome: '',
        selectedEducation: null,
        education: [
            'Early childhood education',
            'Primary education',
            'Lower secondary education',
            'Upper secondary education',
            "Bachelor's or equivalent",
            "Master's or equivalent",
            'Doctorate or equivalent',
        ],
        nationality: null,
        residence: null,
        nationalities: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
        expert: false,
        why: false,
        what: false,
        error: null,
        errorlogin: null
    }),
    methods: {
        submit() {
            this.$refs.observer.validate()
        },
        clear() {
            this.registerUsername = ''
            this.registerPassword = ''
            this.show1 = false
            this.selectedGender = null
            this.birthyear = null
            this.profession = ''
            this.annualIncome = ''
            this.selectedEducation = null
            this.nationality = null
            this.residence = null
            this.expert = false
            this.$refs.observer.reset()
        },
        async login() {
            try {
                const response = await AuthenticationService.login({
                    username: this.username,
                    password: this.password
                })
                try {
                    if (response.response.status == 403) {
                        this.errorlogin = response.response.data.error
                    }
                } catch (err) {
                    this.$store.dispatch('setRefreshToken', response.data.refreshToken)
                    this.$store.dispatch('setAccessToken', response.data.accessToken)
                    this.$store.dispatch('setUser', response.data.user)
                    this.$router.push({ name: 'annotation' }).catch(error => {
                        if (error.name != "NavigationDuplicated") {
                            throw error;
                        }
                    })
                    if (this.rememberMe) {
                        localStorage.username = this.username
                        localStorage.rememberMe = this.rememberMe
                    } else {
                        localStorage.username = ""
                        localStorage.rememberMe = this.rememberMe
                    }
                }
            }
            catch (error) {
                if (error.response.status == 403) this.errorlogin = error.response.data.error
            }
        },
        async register() {
            try {
                const response = await AuthenticationService.register({
                    username: this.registerUsername,
                    password: this.registerPassword,
                    gender: this.selectedGender,
                    age: new Date().getFullYear()-this.birthyear,
                    profession: this.profession,
                    annualIncome: parseInt(this.annualIncome, 10),
                    education: this.selectedEducation,
                    nationality: this.nationality,
                    residence: this.residence,
                    isExpert: false
                })
                try {
                    if (response.response.status == 400) {                       // Workaround: when bad request we receive a response.response 
                        this.error = response.response.data.error                // and when it doesn't fail then reading response.response returns an error and sends to catch {}
                        console.log(this.error)
                    }
                } catch (err) {
                    this.$store.dispatch('setRefreshToken', response.data.refreshToken)
                    this.$store.dispatch('setAccessToken', response.data.accessToken)
                    this.$store.dispatch('setUser', response.data.user)
                    if (!this.expert) {
                        this.$router.push({ name: 'annotation' }).catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        })
                    } else {
                        this.$router.push({ name: 'testPage' }).catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        })
                    }
                }
            }
            catch (error) {
                if (error.response.status == 400) this.error = error.response.data.error
            }
        }
    },
}
</script>

<style scoped>

</style>
