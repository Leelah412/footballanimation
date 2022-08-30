<template>

  <nav id="navbar">
    <div id="navbar-top">
        <router-link id="navbar-logo" to="/" style="margin: 0">
            <img src="@/assets/svg/logo-full.svg" alt="" id="navbar-logo-img">
        </router-link>

        <div id="navbar-links">
            <router-link to="/editor" class="img-button-router">
                <img src="@/assets/svg/match-creator.svg" height="24">
                <div class="flex-column">
                    <span style="font-family: Unispace; font-size: var(--font-size-4);">MATCH</span>
                    <span style="font-size: var(--font-size-6); transform: translateY(2px);">CREATOR</span>
                </div>
            </router-link>
            <router-link to="/squad-creator" class="img-button-router">
                <img src="@/assets/svg/squad-builder.svg" height="24">
                <div class="flex-column">
                    <span style="font-family: Unispace; font-size: var(--font-size-4);">SQUAD</span>
                    <span style="font-size: var(--font-size-6); transform: translateY(2px);">CREATOR</span>
                </div>
            </router-link>
        </div>

        <div id="navbar-user">
            <div v-if="!store.state.loggedIn" class="flex-row">
                <router-link to="/login">
                    <svg-button-selection :selection="SVG_SELECTION.LOGIN" :size="24" :fill="'var(--light)'" :text="'LOGIN'"/>
                </router-link>
            </div>

            <div v-else class="flex-column position-relative">

                <button id="navbar-user-avatar-button" @click="openUserMenu = !openUserMenu">
                    <img :src="store.getters.getAvatarURL()" alt="">
                </button>

                <div id="navbar-user-menu" :class="openUserMenu ? 'open' : ''">

                    <div class="navbar-user-menu-item noselect" style="background:var(--dark); border-bottom: 1px solid var(--accent);">
                        <img :src="store.getters.getAvatarURL()" alt="">
                        <span style="font-size: var(--font-size-3);">{{store.state.username}}</span>
                    </div>
<!--                     <div class="navbar-user-menu-item noselect"></div>
                    <div class="navbar-user-menu-item noselect"></div> -->

                    <div class="navbar-user-menu-item noselect" @click="logout">
                        <svg-button-selection :selection="SVG_SELECTION.LOGOUT" :size="24" :fill="'var(--light)'" />
                        <span>Logout</span>
                    </div>

                </div>
            </div>
        </div>
    </div>

  </nav>

</template>


<script lang="ts" setup>
import API from "@/services/API";
import Authentication from "@/services/Authentication";
import store from "@/store";
import { onUpdated, ref } from "vue-demi";
import { SVG_SELECTION } from "./helper/enums";
import SvgButtonSelection from "./misc/svg-button-selection.vue";

const openUserMenu = ref<boolean>(false);

onUpdated(()=>{
    // make sure that if we log out, we don't keep the menu open;
    // this might seem irrelevant at first, but if we log in again,
    // and "openUserMenu" is true, the menu might be shown immediately
    if(!store.state.loggedIn && openUserMenu) openUserMenu.value = false;
});

function logout(){
    Authentication.logout();
    store.commit('logout');
}

</script>


<style lang="scss">

:root{
    --navbar-height: 48px;
}

</style>

<style lang="scss" scoped>

nav{
    position: sticky;
    top: 0;
    z-index: 1000000;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: var(--navbar-height);
    box-sizing: border-box;

    box-shadow: 0 0 4px var(--dark);

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
    flex-direction: row;
    align-items: center;

    text-decoration: none;
    color: var(--light);
    letter-spacing: 1px;
    margin: auto 8px;

    font-size: var(--font-size-5);
    font-weight: 300;

    &:hover{
        filter: brightness(0.95);
    }

    img{
        margin-right: 8px;
    }
}

#navbar-top{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding-left: var(--global-margin);
    padding-right: var(--global-margin);

    background: var(--secondary-dark);
    border-bottom: 1px solid var(--accent);
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    #navbar-logo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

@media screen and (max-width: 1200px) {
    #navbar-top{
        padding-left: 8px;
        padding-right: 8px;
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
    --avatar-button-size: 36px;

    #navbar-user-avatar-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: var(--avatar-button-size);
        height: var(--avatar-button-size);
        background: var(--secondary-dark);
        border: 2px solid var(--accent);
        border-radius: 1000px;
        box-shadow: 0 0 4px var(--dark);
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
        }

        &:hover{
            filter: brightness(1.2);
        }

        &:active{
            filter: brightness(0.8);
        }
    }

    #navbar-user-menu{
        position: absolute;
        top: calc(var(--avatar-button-size) + 8px);
        right: 0;

        box-shadow: 0 0 4px var(--dark);
        background: var(--dark-2);
        min-width: 128px;

        z-index: -1000;
        transform: translateY(-196px);
        transition-duration: 0.3s;
        
        &.open{
            z-index: 0;
            transform: translateY(0px);
        }

        .navbar-user-menu-item{
            cursor: pointer;
            display: grid;
            grid-template-columns: 32px auto;
            padding: 8px;
            height: 24px;

            .svg-button-selection{
                padding-right: 8px;
            }
            img{
                height: 24px;
                width: 24px;
                padding-right: 8px;
            }

            span{
                margin: auto;
                margin-left: 0;
                font-size: var(--font-size-4);
                color: var(--light);
            }

            &:hover{
                background: var(--dark-3);
            }
        }

    }

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