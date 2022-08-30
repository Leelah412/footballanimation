<template>
    
<div id="login" class="global-padding">

    
    <div class="center-container">
        <div class="header-standard-p-16">LOGIN</div>

        <span class="error-msg" style="text-align:left">{{login_error_msg}}</span>

        <span class="error-msg" style="text-align:left">{{username_error_msg}}</span>
        <div id="login-username" class="flex-row" style="padding-top: 8px">
            <svg-button-selection :selection="SVG_SELECTION.EMAIL" :size="24" style="margin-right:32px;"/>

            <div class="form-animation-container flex-grow">
                <input type="text" id="username" name="username" v-model="username" class="form-animation-input width-100"
                    @focusin="focused_input = 'username'" @focusout="focused_input = ''">
                <label for="username" :class="`form-animation-label ${(focused_input === 'username' || username !== '') ? 'focused' : ''}`">
                    Username
                </label>
            </div>
        </div>

        <span class="error-msg" style="text-align:left">{{password_error_msg}}</span>
        <div id="login-password" class="flex-row" style="padding-top: 8px">
            <svg-button-selection :selection="SVG_SELECTION.PASSWORD" :size="24" style="margin-right:32px;"/>

            <div class="form-animation-container flex-grow">
                <input type="password" id="password" name="password" v-model="password" class="form-animation-input width-100"
                    @focusin="focused_input = 'password'" @focusout="focused_input = ''">
                <label for="password" :class="`form-animation-label ${(focused_input === 'password' || password !== '') ? 'focused' : ''}`">
                    Password
                </label>
            </div>
        </div>

        <div class="flex-row">
            <input class="m-center-v" type="checkbox" name="remember-me" id="remember-me" v-model="rememberMe">
            <label for="remember-me" class="label-checkbox m-center-v">Remember Me</label>
            <button class="btn-bootstrap-secondary m-right" @click="login">LOGIN</button>
        </div>
        <div class="flex-column m-center-v" style="font-size:var(--font-size-4); margin-bottom: 0; text-align: left;">
            <router-link to="/reset-password">Reset Password</router-link>
            <router-link to="/registration" style="font-weight: 600; font-size: var(--font-size-3); margin-top: 16px;">No account? Register here!</router-link>
        </div>
    </div>

</div>

</template>


<script lang="ts" setup>
import { SVG_SELECTION } from "@/components/helper/enums";
import { ref } from "vue-demi";
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import Authentication from "@/services/Authentication";
import router from "@/router";
import store from "@/store";

const username = ref<string>('');
const password = ref<string>('');
const rememberMe = ref<boolean>(false);

const username_error_msg = ref<string>('');
const password_error_msg = ref<string>('');

const login_error_msg = ref<string>('');

function login(){

    var return_error = false;
    
    if(!(username.value.length > 0)){
        username_error_msg.value = 'Username missing!';
        return_error = true;
    }
    else username_error_msg.value = '';

    if(!(password.value.length > 0)){
        password_error_msg.value = 'Password missing!';
        return_error = true;
    }
    else password_error_msg.value = '';

    if(return_error) return;

    Authentication.login(username.value, password.value, rememberMe.value)
    .then(res=>{
        login_error_msg.value = '';
        store.commit('login', res);
        router.push('/');
    })
    .catch(err=>{
        login_error_msg.value = err;
    })
}

////////////
// VISUAL //
////////////

const focused_input = ref<string>('');

</script>


<style lang="scss" scoped>

#login{
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--navbar-height));

}

a{
    color: var(--accent);
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }
}

</style>