<template>
    
<div id="home">

    <div id="home-hero" class="global-padding">
        <div id="hero-left">
            <div class="home-header">
                Recreate your favourite football matches!
            </div>
            <div class="home-description">
                Create complex 2D animations for your favourite football scenarios and share them online or export them as video!
            </div>
            <div class="flex-row" style="margin-top: 64px">
                <button class="btn-bootstrap-accent" style="margin-right: 12px;">
                    Create a Match!
                </button>
                <button class="btn-bootstrap-accent" style="background: var(--dark-6)">
                    View Matches
                </button>
            </div>
        </div>

        <div id="hero-right">

        </div>

    </div>

    <div id="home-content" class="global-padding">
        aaaaaaaaa
    </div>

    <div id="home-examples" class="global-padding">
aaaaaaaaa
    </div>

    <div id="home-register" class="global-padding">
aaaaaaaaa
    </div>

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";

onMounted(()=>{
    document.addEventListener('scroll', scroll);
    
})

onUnmounted(()=>{
    document.removeEventListener('scroll', scroll);
    
});

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
/* 
#home-register{
    margin-top: 500px;
} */

#home{
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    color: var(--light);
    background: var(--dark);
        
/*     background: url("../assets/hero.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100vw;
    background-position-y: 80%; */
/*     padding: 32px; */
}

.home-header{
    font-family: Nunito, Verdana, Geneva, Tahoma, sans-serif;
    font-size: var(--font-size-0);
    font-weight: 300;
    text-align: left;
    margin-bottom: 16px;
}

.home-description{
    font-family: Nunito, Verdana, Geneva, Tahoma, sans-serif;
    text-align: left;
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

    background: url("../assets/hero.jpg");
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position-y: 80%;

    box-shadow: inset 0 0 4px #000;
}

#hero-left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
}

#hero-right{
    width: 50%;
}

/////////////////

#home-content{
    
}

</style>