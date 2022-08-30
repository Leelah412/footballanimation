<template>
    
<div id="registration" class="global-padding">

    
    <div v-show="step === STEP.BASIC" class="center-container">
        <div class="header-standard-p-16">CREATE AN ACCOUNT</div>
        <span class="error-msg" v-if="server_error_msg !== ''">{{server_error_msg}}</span>

        <div class="flex-column">
            <span class="error-msg">{{username_error_msg}}</span>
            <div class="form-animation-container flex-grow">
                <input type="text" id="username" name="username" v-model="username" class="form-animation-input width-100"
                    @focusin="focused_input = 'username'" @focusout="focused_input = ''">
                <label for="username" :class="`form-animation-label ${(focused_input === 'username' || username !== '') ? 'focused' : ''}`">
                    Username
                </label>
            </div>
        </div>

        <div class="flex-column">
            <span class="error-msg">{{email_error_msg}}</span>
            <div class="form-animation-container flex-grow">
                <input type="email" id="email" name="email" v-model="email" class="form-animation-input width-100"
                    @focusin="focused_input = 'email'" @focusout="focused_input = ''">
                <label for="email" :class="`form-animation-label ${(focused_input === 'email' || email !== '') ? 'focused' : ''}`">
                    E-Mail
                </label>
            </div>
        </div>

        <div class="flex-column">
            <span class="error-msg">{{password_error_msg}}</span>
            <div class="form-animation-container flex-grow">
                <input type="password" id="password" name="password" v-model="password" class="form-animation-input width-100"
                    @focusin="focused_input = 'password'" @focusout="focused_input = ''">
                <label for="password" :class="`form-animation-label ${(focused_input === 'password' || password !== '') ? 'focused' : ''}`">
                    Password
                </label>
            </div>
        </div>

        <div class="flex-column">
            <span class="error-msg">{{repeat_password_msg}}</span>
            <div class="form-animation-container flex-grow">
                <input type="password" id="password-repeat" name="password-repeat" v-model="repeat_password" class="form-animation-input width-100"
                    @focusin="focused_input = 'password-repeat'" @focusout="focused_input = ''">
                <label for="password-repeat" :class="`form-animation-label ${(focused_input === 'password-repeat' || repeat_password !== '') ? 'focused' : ''}`">
                    Repeat Password
                </label>
            </div>
        </div>
        
<!--         <div id="registration-username" class="flex-column">
            <span class="error-msg" v-if="username_error_msg !== ''">{{username_error_msg}}</span>
            <label class="label-over" for="username">USERNAME</label>
            <input type="text" id="username" name="username" class="input-dark-2" v-model="username">
        </div> -->

<!--         <div id="registration-email" class="flex-column">
            <span class="error-msg" v-if="email_error_msg !== ''">{{email_error_msg}}</span>
            <label class="label-over" for="email">EMAIL</label>
            <input type="email" id="email" name="email" class="input-dark-2" v-model="email">
        </div> -->

<!--         <div id="registration-password" class="flex-column">
            <span class="error-msg" v-if="password_error_msg !== ''">{{password_error_msg}}</span>
            <label class="label-over" for="password">PASSWORD</label>
            <input type="password" id="password" name="password" class="input-dark-2" v-model="password">
        </div> -->

<!--         <div id="registration-password-repeat" class="flex-column">
            <span class="error-msg" v-if="repeat_password_msg !== ''">{{repeat_password_msg}}</span>
            <label class="label-over" for="password-repeat">REPEAT PASSWORD</label>
            <input type="password" id="password-repeat" name="password-repeat" class="input-dark-2" v-model="repeat_password">
        </div> -->

        <!-- <button class="btn-bootstrap-secondary" @click="checkBasic() ? step = STEP.USER_INFO : step">NEXT</button> -->
        <button class="btn-bootstrap-secondary" @click="send">SEND</button>


        <div class="flex-column m-center-v" style="font-size:var(--font-size-4); margin-bottom: 0;">
            <router-link to="/login" style="font-weight: 600; font-size: var(--font-size-3); margin-top: 16px;">I have an account</router-link>
        </div>
    </div>

    <div v-show="step === STEP.USER_INFO" class="center-container">
        <div class="header-standard">ACCOUNT SETTINGS</div>

        <div id="registration-avatar">

        </div>

        <div id="registration-first-name">

        </div>

        <div id="registration-last-name">

        </div>

        <div id="registration-birthday">

        </div>

        <div id="registration-about">

        </div>

        <div class="flex-row">
            <button class="btn-bootstrap-secondary" @click="step = STEP.BASIC">Back</button>            
            <input type="submit" class="btn-bootstrap-accent" style="border:none" value="SUBMIT"/>
        </div>

    </div>

</div>

</template>


<script lang="ts" setup>
import Authentication from "@/services/Authentication";
import { ref } from "vue-demi";

enum STEP {BASIC, USER_INFO, DONE};
var step = ref<STEP>(STEP.BASIC);


const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const repeat_password = ref<string>('');

const username_error_msg = ref<string>('');
const email_error_msg = ref<string>('');
const password_error_msg = ref<string>('');
const repeat_password_msg = ref<string>('');
const server_error_msg = ref<string>('');

function checkBasic(): boolean{


    var return_error: boolean = false;

    if(username.value.length < 1){
        username_error_msg.value = 'Username must contain at least one character!';
        return_error = true;
    }
    else username_error_msg.value = '';

    if(email.value.split('@').length - 1 !== 1){
        email_error_msg.value = 'Wrong e-mail format!';
        return_error = true;
    }
    else email_error_msg.value = '';

    if(password.value.length < 8){
        password_error_msg.value = 'Password must contain at least 8 characters!';
        return_error = true;
    }
    else password_error_msg.value = '';

    if(password.value !== repeat_password.value){
        repeat_password_msg.value = 'Passwords don\'t match!';
        return_error = true;
    }
    else repeat_password_msg.value = '';
    
    server_error_msg.value = '';

    if(return_error) return false;

    return true;
}

function send(){

    if(!checkBasic()) return;

    Authentication.registration(
        username.value,
        email.value,
        password.value
    )
    .then(res => {
        server_error_msg.value = '';
    })
    .catch(err => {
        server_error_msg.value = err.response.data;
    })
}


///////////////////////////

const focused_input = ref<string>('');

</script>



<style lang="scss" scoped>

#registration{
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