<template>
    
<div id="user-profile" class="">

    <div v-if="userFound" class="header global-padding">
        <div class="avatar">
            <img :src="store.getters.getAvatarURL()" alt="">
        </div>
        <div class="info flex-grow">
            <div class="username">{{user ? user.username : ''}}</div>
            <div class="joined">joined {{user ? user.joined : ''}}</div>
        </div>
    </div>

    <div v-if="userFound" class="content">
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
                {{user ? user.about : ''}}
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
    
    <div v-if="userNotFound" class="header-standard flex-column align-center" style="height: calc(100vh - var(--navbar-height)); font-size: var(--font-size-1); box-sizing: border-box;">
        USER NOT FOUND
    </div>

</div>

</template>


<script lang="ts" setup>
import SvgButtonSelection from "@/components/misc/svg-button-selection.vue";
import { SVG_SELECTION } from "@/components/helper/enums";
import CardSquad from "../components/r_user_profile/CardSquad.vue";
import router from "@/router";
import API, { domain } from "@/services/API";
import store from "@/store";
import { ref } from "@vue/reactivity";



// set "userFound" to true, if user data is successfully fetched from server
const userFound = ref<boolean>(false);
// otherwise set "userNotFound" to true
// NOTE: we can't just check, if "userFound" is false instead for obvious reasons
const userNotFound = ref<boolean>(false);

const userOwnsPage = ref<boolean>(false);

interface User{
    username: string
    email: string
    first_name: string
    last_name: string
    birthday: Date
    avatar: string
    joined: Date
    about: string
}

const user = ref<User | undefined>();

enum TAB_STATE {SQUADS, MATCHES, ABOUT, SEARCH};

const tabState = ref<TAB_STATE>(TAB_STATE.SQUADS);

function switchTab(newTab: TAB_STATE){
    tabState.value = newTab;
}

const squadResults = ref([]);
const matchResults = ref([]);

const resultFilter = ref({});
const resultCount = ref(0);

getUserData();

watch(router.currentRoute.value.params, (to, prev)=>{    
    reset();
    getUserData();

    // TODO: set filters
    switch(tabState.value){
        case TAB_STATE.SQUADS: getSquads({}); break;
        case TAB_STATE.MATCHES: getMatches({}); break;
        default: break;
    }
})

function reset(){
    userFound.value = false;
    userNotFound.value = false;
    user.value = undefined;

    squadResults.value = [];
    matchResults.value = [];
    resultCount.value = 0;
}

async function getUserData(){
    const username = router.currentRoute.value.params.username;

    try{
        // if logged in user calls its own profile, try to get additional information per post
        var res;
        const token = localStorage.getItem('accessToken');
        if(username === store.state.username && token !== null){            
            res = await API().post(`/user/${username}`, {accessToken: token});
            userOwnsPage.value = true;
        }
        else{
            res = await API().get(`/user/${username}`);
            userOwnsPage.value = false;
        }

        console.log("return value: ", res);

        var _user: User = {
            username: res.data.username !== undefined && res.data.username || '',
            email: res.data.email !== undefined && res.data.email || '',
            first_name: res.data.first_name !== undefined && res.data.first_name || '',
            last_name: res.data.last_name !== undefined && res.data.last_name || '',
            birthday: res.data.birthday !== undefined && res.data.birthday || '',
            avatar: res.data.avatar !== undefined && res.data.avatar || 'default.png',
            joined: res.data.joined !== undefined && res.data.joined || '',
            about: res.data.about !== undefined && res.data.about || '',
        };

        user.value = _user;

        userFound.value = true;
    }
    catch(error){
        console.error(error);
        userNotFound.value = true;
    }
}

function getURL(){
    
    var url = domain + '/files/avatar/' + (user.value && user.value.avatar !== '' ? user.value.avatar : 'default.png');
    console.log("img url: ", url);
    
    return url;
}

/////////////////////////////////

function getSquads(filter){

}

function getMatches(filter){

}

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

            @media screen and (min-width: 900px) {
                grid-template-columns: repeat(2, 31fr);
            }        
            @media screen and (min-width: 1200px){
                grid-template-columns: repeat(3, 31fr);
            }
        }

    }
}


</style>