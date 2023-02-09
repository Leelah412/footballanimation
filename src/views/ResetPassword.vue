<template>
    
<div id="reset-password" class="global-padding">
    

    <div class="center-container">
        <div class="header-standard-p-16">RESET PASSWORD</div>

        <div v-show="step === STEP.SEND_CODE" id="reset-password-step-1" class="flex-column">
            <div class="form-animation-container flex-grow">
                <input type="text" id="email" name="email" v-model="reset_mail" class="form-animation-input width-100"
                    @focusin="focused_input = 'email'" @focusout="focused_input = ''">
                <label for="email" :class="`form-animation-label ${(focused_input === 'email' || reset_mail !== '') ? 'focused' : ''}`">
                    Enter E-Mail
                </label>
            </div>

            <div @click="step = STEP.ENTER_CODE" class="btn-bootstrap-secondary">NEXT</div>
        </div>

        <div v-show="step === STEP.ENTER_CODE" id="reset-password-step-2" class="flex-column">
            <div class="form-animation-container flex-grow">
                <input type="text" id="code" name="code" v-model="code" class="form-animation-input width-100"
                    @focusin="focused_input = 'code'" @focusout="focused_input = ''">
                <label for="code" :class="`form-animation-label ${(focused_input === 'code' || code !== '') ? 'focused' : ''}`">
                    Enter Code
                </label>
            </div>

            <div @click="step = STEP.SEND_CODE">Go back</div>
            <div @click="step = STEP.NEW_PASSWORD" class="btn-bootstrap-secondary">NEXT</div>
        </div>

        <div v-show="step === STEP.NEW_PASSWORD" id="reset-password-step-3" class="flex-column">
            <div id="reset-password-username" class="flex-column">
                <label class="label-over" for="username">USERNAME</label>
                <input type="text" id="username" name="username" class="input-dark-2">
            </div>
            <div id="reset-password-email" class="flex-column">
                <label class="label-over" for="email">EMAIL</label>
                <input type="email" id="email" name="email" class="input-dark-2">
            </div>
            <div id="reset-password-password" class="flex-column">
                <label class="label-over" for="password">NEW PASSWORD</label>
                <input type="password" id="password" name="password" class="input-dark-2">
            </div>
            <div id="reset-password-password-repeat" class="flex-column">
                <label class="label-over" for="password-repeat">REPEAT PASSWORD</label>
                <input type="password" id="password-repeat" name="password-repeat" class="input-dark-2">
            </div>
            <div class="flex-row">
                
                <input type="submit" class="btn-bootstrap-accent" style="border:none" value="SUBMIT"/>
            </div>
        </div>

    </div>

</div>

</template>


<script lang="ts" setup>
import { ref } from "@vue/reactivity";

enum STEP {SEND_CODE, ENTER_CODE, NEW_PASSWORD};

const step = ref<STEP>(STEP.SEND_CODE);

const reset_mail = ref<string>('');
const code = ref<string>('');


function sendCodeRequest(){
    
}

async function sendCode(){

}

// when code is verified, allow user to send new password
function verifyCode(){
    step.value = STEP.NEW_PASSWORD;
}

function submit(){

}


////////////
// VISUAL //
////////////

const focused_input = ref<string>('');

</script>



<style lang="scss" scoped>

#reset-password{
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--navbar-height));

}

</style>