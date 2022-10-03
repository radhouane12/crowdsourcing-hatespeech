<template>
    <v-container class="my-10">
        <v-layout row>
            <v-flex xs12 md5>
                <v-sheet color="deep-purple" elevation="1" height="300" outlined rounded shaped>
                    <p class="my-3 mx-4" style="color:white">
                        This is a text about the platform
                    </p>
                </v-sheet>
            </v-flex>
            <v-flex></v-flex>
            <v-flex xs12 md6>
                <template>
                    <v-card>
                        <v-toolbar flat color="deep-purple">
                            <v-tabs v-model="tabs" fixed-tabs>
                                <v-tabs-slider color="#FFFFFF"></v-tabs-slider>
                                <v-tab to="#mobile-tabs-5-1" class="primary--text">
                                    <span style="color:#FFFFFF">Sign In</span>
                                </v-tab>
                                <v-tab to="#mobile-tabs-5-2" class="primary--text">
                                    <span style="color:#FFFFFF">Sign In</span>
                                </v-tab>
                            </v-tabs>
                        </v-toolbar>
                        <v-tabs-items v-model="tabs">
                            <v-tab-item value='mobile-tabs-5-1'>
                                <v-form>
                                    <v-card class="elevation-12">
                                        <v-card-text>
                                            <v-form>
                                                <v-text-field prepend-icon="person" name="login" label="Login"
                                                    type="text"></v-text-field>
                                                <v-text-field id="password" prepend-icon="lock" name="password"
                                                    label="Password" type="password"></v-text-field>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="deep-purple">
                                                <span style="color:#FFFFFF; font-size: 13px" >Login</span>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-form>
                            </v-tab-item>
                            <v-tab-item value='mobile-tabs-5-2' style="background-color:#E6E6FA">
                                <validation-observer ref="observer" v-slot="{ invalid }">
                                    <form class="ma-3" @submit.prevent="submit">
                                        <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
                                            <v-text-field v-model="name" :counter="10" :error-messages="errors"
                                                label="Name" required outlined></v-text-field>
                                        </validation-provider>
                                        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                                            <v-text-field outlined v-model="email" :error-messages="errors"
                                                label="E-mail" required></v-text-field>
                                        </validation-provider>
                                        <validation-provider v-slot="{ errors }" name="select" rules="required">
                                            <v-select outlined v-model="select" :items="items" :error-messages="errors"
                                                label="Select" data-vv-name="select" required></v-select>
                                        </validation-provider>
                                        <validation-provider v-slot="{ errors }" rules="required" name="checkbox">
                                            <v-checkbox class="mb-3" v-model="checkbox" :error-messages="errors" value="1"
                                                label="Option" type="checkbox" required></v-checkbox>
                                        </validation-provider>
                                        <v-btn color="deep-purple" @click="clear" outlined>
                                            <span style="color:#673AB7">clear</span>
                                        </v-btn>
                                        <v-btn color="deep-purple" class="mr-4" type="submit" :disabled="invalid" absolute right>
                                            <span style="color:#FFFFFF">submit</span>
                                        </v-btn>                 
                                    </form>
                                </validation-observer>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
    ...email,
    message: 'Email must be valid',
})
export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        tabs: null,
        name: '',
        phoneNumber: '',
        email: '',
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: null,
    }),

    methods: {
        submit() {
            this.$refs.observer.validate()
        },
        clear() {
            this.name = ''
            this.phoneNumber = ''
            this.email = ''
            this.select = null
            this.checkbox = null
            this.$refs.observer.reset()
        },
    },
}
</script>

<style scoped>

</style>
