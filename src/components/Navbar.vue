<template>

  <nav id="navbar">
    <div id="navbar-top">
        <router-link id="navbar-logo" to="/" style="margin: 0">
            <img src="@/assets/svg/logo-full.svg" alt="" id="navbar-logo-img">
        </router-link>

        <div id="navbar-links">
            <router-link to="/editor" class="img-button-router">
                <img src="@/assets/svg/match-creator-full.svg">
                <!-- <span>MATCH</span> -->
            </router-link>
            <router-link to="/squad_creator" class="img-button-router">
                <img src="@/assets/svg/squad-builder-full.svg">
                <!-- <span>SQUAD</span> -->
            </router-link>
        </div>

        <div id="navbar-user">
            <div class="flex-row" v-if="!loggedIn">
                <svg-button-selection :selection="SVG_SELECTION.LOGIN" :size="24" :fill="'var(--light)'" :text="'LOGIN'"/>
            </div>
        </div>
    </div>
    <div id="navbar-bottom">
        <a href="">MATCHES</a>
        <a href="">SQUADS</a>
<!--         <a href="">PLAYER</a>
        <a href="">TEAMS</a> -->
    </div>

    <!-- <router-link to="/about" class="standard-router">ABOUT</router-link> -->
  </nav>

</template>


<script lang="ts" setup>
import { ref } from "vue-demi";
import { SVG_SELECTION } from "./helper/enums";
import SvgButtonSelection from "./misc/svg-button-selection.vue";

// TODO: later on we will get the correct value from the store
const loggedIn = ref<boolean>(false);

</script>


<style lang="scss" scoped>

nav{
    position: sticky;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    box-shadow: 0 0 2px var(--dark);

    a{
        text-decoration: none;
        color: var(--light);
        letter-spacing: 1px;
        margin: auto 8px;

        &:hover{
            color: var(--light-2);
        }
    }



}



.img-button-router{
    display: flex;
    flex-direction: column;

    text-decoration: none;
    color: var(--light);
    letter-spacing: 1px;
    margin: auto 8px;

    font-size: var(--font-size-5);
    font-weight: 300;

    &:hover{
        color: var(--light-2);
    }
}

#navbar-top{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding-left: var(--global-margin);
    padding-right: var(--global-margin);

    background: var(--secondary);
    border-bottom: 1px solid var(--accent);
    height: 48px;
    width: 100%;
    box-sizing: border-box;

    #navbar-logo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

#navbar-bottom{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: var(--global-margin);
    padding-right: var(--global-margin);
    
    background: var(--secondary-dark);
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    font-size: var(--font-size-4);
}

#navbar-links{
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
}

#navbar-user{
    display: flex;
    flex-direction: row;

/*     button{
        margin: auto 8px;
        padding: 5px 9px;
        border: 1px solid var(--light);
        border-radius: 4px 8px;
        color: var(--light);
        &:nth-child(1){
            border: none;
            background: var(--light);
            color: var(--secondary);
            font-weight: 900; 
            padding: 4px 8px;
        }
    } */
}

</style>