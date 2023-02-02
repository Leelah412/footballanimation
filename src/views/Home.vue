<template>
    
<div id="home">

    <div id="home-hero" class="position-relative global-padding flex-column" :style="`height:100vh;`">

        <div id="presentation-match" class="position-absolute" style="top:0;left:0; height:100%; width: 100vw; box-shadow: 0 0 4px var(--dark); filter: brightness(0.2);">
        </div>

        <div class="position-absolute flex-column flex-grow align-items-center justify-content-center" style="height:33%; top:0;">
            <img id="soccer-studio-logo" class="m-center-v" src="@/assets/svg/logo-full.svg" alt="">
        </div>

        <div class="position-absolute flex-column" style="height:67%; top:33%;">
            <div class="home-header flex-column" style="height: 33%; max-width: 900px; ">
                <span class=" m-center-v">RECREATE YOUR FAVOURITE MOMENTS IN FOOTBALL AND SHARE THEM WITH THE WORLD</span>
            </div>
            <div class="flex-column m-top m-center-h">
                <router-link to="/editor" class="m-center-v">
                    <button class="btn-square-secondary-light" style="filter: drop-shadow(1px 1px 2px var(--dark)); font-weight: 900;">
                        CREATE A MATCH
                    </button>
                </router-link>

                <!--
                <button class="btn-simple-light" style="margin-top:16px;">
                    View Matches
                </button>
                -->
            </div>
        </div>

    </div>

    <div id="home-content" class="flex-column global-padding">
        
    </div>

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";

const vh = ref(0);

onMounted(()=>{
    calcHeight();
    document.addEventListener('scroll', scroll);
    window.addEventListener('resize', calcHeight); 
})

onUnmounted(()=>{
    document.removeEventListener('scroll', scroll);
    window.removeEventListener('resize', calcHeight); 
    
});

function calcHeight(){
    vh.value = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

function scroll(ev){
    const home = document.getElementById('home-hero');
    if(home === null || home === undefined) return;
    const rect = home.getBoundingClientRect();
    const scrll = home.scrollTop;

    console.log(window.scrollY);
    console.log(rect.height);
    if(window.scrollY > rect.height){
        console.log('scrolled over border');        
    }
}

</script>


<style lang="scss" scoped>

#home{
    box-sizing: border-box;
    min-height: calc(100vh - var(--navbar-height));
    overflow: hidden;
    color: var(--light);
}

.home-header{
    font-family: Unispace, Verdana, Geneva, Tahoma, sans-serif;
    font-size: var(--font-size-1);
    font-weight: 300;
    /* color: var(--light); */
}

.home-description{
    /* font-family: Nunito, Verdana, Geneva, Tahoma, sans-serif; */
    font-size: var(--font-size-3);
}

#home-hero{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    width: 100%;
    height: 384px;
/* padding: 256px; */

    box-shadow: inset 0 0 4px #000;
}

#soccer-studio-logo{
    height: 128px;
}

#presentation-match{
    background: url("../assets/img-squads.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100hw;
    background-position-y: 50%;
    background-position-x: 50%;
}

#presentation-squad{

}


/////////////////

#home-content{
    //padding-top: 32px;
    //padding-bottom: 32px;
}

</style>