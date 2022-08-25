<template>
    
<div id="user-profile" class="">

    <div class="header global-padding">
        <div class="avatar">
            <img :src="require('@/assets/' + TEST_USER.avatar)" alt="">
        </div>
        <div class="info">
            <div class="username">{{TEST_USER.username}}</div>
            <div class="joined">joined {{TEST_USER.joined}}</div>
        </div>
    </div>

    <div class="content">
        <div class="tabs global-padding">
            <button :class="`btn-standard${tabState === TAB_STATE.SQUADS ? '-active': ''} tab`"
                @click="switchTab(TAB_STATE.SQUADS)">
                SQUADS
            </button>
            <button :class="`btn-standard${tabState === TAB_STATE.MATCHES ? '-active': ''} tab`"
                @click="switchTab(TAB_STATE.MATCHES)">
                MATCHES
            </button>
            <button :class="`btn-standard${tabState === TAB_STATE.ABOUT ? '-active': ''} tab`"
                @click="switchTab(TAB_STATE.ABOUT)">
                ABOUT
            </button>
            <div v-if="tabState === TAB_STATE.SEARCH" class="search">
                <input class="input-bottom-line" type="search" placeholder="Search..." name="" id="">
            </div>
            <svg-button-selection v-if="tabState !== TAB_STATE.SEARCH" :selection="SVG_SELECTION.SEARCH" :size="24" @click="switchTab(TAB_STATE.SEARCH)"/>
        </div>
        <div class="results global-padding">
            <div class="results-header">
                <div v-if="tabState === TAB_STATE.SQUADS" class="header-standard">SQUADS</div>
                <div v-else-if="tabState === TAB_STATE.MATCHES" class="header-standard">MATCHES</div>
                <div v-else-if="tabState === TAB_STATE.ABOUT" class="header-standard" style="margin-left:auto; margin-right:auto">ABOUT</div>

                <div v-if="tabState === TAB_STATE.SQUADS || tabState === TAB_STATE.MATCHES" class="results-search">
                    <div class="flex-column">
                        <label for="" class="label-over">SORT BY</label>
                        <select name="" id="" class="input-select">
                            <option value="">Likes - Descending</option>
                            <option value="">Likes - Ascending</option>
                            <option value="">New</option>
                            <option value="">Old</option>
                        </select>
                    </div>
                </div>

            </div>
            <div v-if="tabState === TAB_STATE.ABOUT" class="results-about">
                {{TEST_USER.about}}
            </div>

            <div v-else class="results-content">
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
                <CardSquad />
            </div>
        </div>
    </div>
    

</div>

</template>


<script lang="ts" setup>
import { ref } from "vue-demi"
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import { SVG_SELECTION } from "@/components/helper/enums";
import CardSquad from "../components/r_user_profile/CardSquad.vue";

const AVATAR_URL = '../assets/';

const TEST_USER = {
    username: 'LoremIpsum96',
    firstname: 'Lorem',
    lastname: 'Ipsum',
    email: 'lorem@ipsum.sic',
    birthday: '04 Dec 1996',
    avatar: 'logo.png',
    about: 'Lorem Ipsum Dolorum Sic Est Quintus Flavia Placet',
    joined: '01 Dec 1999',

}

enum TAB_STATE {SQUADS, MATCHES, ABOUT, SEARCH};

const tabState = ref<TAB_STATE>(TAB_STATE.SQUADS);


function switchTab(newTab: TAB_STATE){
    tabState.value = newTab;
}

const squadResults = ref([]);
const matchResults = ref([]);
const resultCount = ref(0);

</script>



<style lang="scss" scoped>

#user-profile{
    display: flex;
    flex-direction: column;
}


.header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 32px;
    padding-bottom: 32px;

    border-bottom: 1px solid var(--accent);

    .avatar{
        width: 128px;
        height: 128px;
        margin-right: 32px;
        img{
            width: 100%;
            height: 100%;            
        }
    }

    .info{
        display: flex;
        flex-direction: column;
        text-align: left;

        .username{
            font-weight: 600;
            font-size: var(--font-size-1);
        }
        .joined{
            color: var(--light-4);
            font-size: var(--font-size-5);
        }
    }
}


.content{
    .tabs{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 32px;
        .tab{
            margin-right: 32px;
        }
        .input-bottom-line{
            font-size: var(--font-size-4);
        }
    }
    .results{
        display: flex;
        flex-direction: column;

        box-shadow: inset 0 0 4px #000;
        min-height: 256px;
        padding-bottom: 64px;
        background: var(--dark-2);

        .results-header{
            display: flex;
            flex-direction: row;
            .results-search{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            padding-bottom: 32px;
        }

        .results-about{
            text-align: left;
            font-size: var(--font-size-3);
        }


        .results-content{
            display: grid;
            grid-template-columns: repeat(1, 31fr);
            row-gap: 32px;
            column-gap: 32px;

            margin-left: auto;
            margin-right: auto;
        }

        @media screen and (min-width: 900px) {
            .results-content{
                display: grid;
                grid-template-columns: repeat(2, 31fr);
            }
        }

        @media screen and (min-width: 1200px){
            .results-content{
                display: grid;
                grid-template-columns: repeat(3, 31fr);
            }
        }
    }
}


</style>