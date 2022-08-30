<template>
    
<div id="home">

    <div class="position-relative global-padding" style="height:240px; margin-top:32px;">
        <div id="presentation-squad" class="position-absolute" style="top:0;left:0; height:120%; width: 120vw; transform: rotate(1deg) translate(10px, -60px); background: var(--primary-dark); box-shadow: 0 0 4px var(--dark);">

        </div>
        <div id="presentation-match" class="position-absolute" style="top:0;left:0; height:120%; width: 120vw; transform: rotate(-1deg) translate(-10px, -60px); box-shadow: 0 0 4px var(--dark); filter: brightness(0.2);">

        </div>

        <div class="position-absolute" id="hero-left">
            <div class="home-header">
                RECREATE YOUR FAVOURITE MATCHES!
                <!-- Recreate your favourite football matches! -->
            </div>
            <div class="home-description">
                Create complex 2D animations for your favourite football scenarios and share them online or export them as video!
            </div>
            <div class="flex-row" style="margin-top: 64px">
                <button style="color: var(--cl-1); padding: 16px; border: 4px solid var(--cl-1); font-size: var(--font-size-3); margin-right: 16px; font-weight: 600;">
                    Create a Match!
                </button>
                <button style="color: var(--light); padding: 16px; font-size: var(--font-size-3); font-weight: 600;">
                    View Matches
                </button>
            </div>
        </div>

        <div id="hero-right">

        </div>

    </div>

<!--     <div id="home-hero" class="global-padding">
        
        <div id="hero-left">
            <div class="home-header">
                Recreate your favourite football matches!
            </div>
            <div class="home-description">
                Create complex 2D animations for your favourite football scenarios and share them online or export them as video!
            </div>
            <div class="flex-row" style="margin-top: 64px">
                <button class="btn-bootstrap-accent" style="background: var(--blue); margin-right: 12px;">
                    Create a Match!
                </button>
                <button class="btn-bootstrap-accent" style="background: var(--dark-6)">
                    View Matches
                </button>
            </div>
        </div>

        <div id="hero-right">

        </div>

    </div> -->

    <div id="home-content" class="flex-column global-padding">

        <div id="home-top-squads" class="flex-column" style="margin-bottom:64px;">
            <div class="flex-row align-center">
                <div class="header-standard m-left" style="padding-left:0">TOP SQUADS</div>
                <a href="" style="text-decoration: none; color:var(--secondary-light); padding: 8px; border: 1px solid var(--secondary-light);">More Squads</a>
            </div>
            <div id="home-top-squad-list" class="card-grid">
                <CardSquad />
                <CardSquad />
                <CardSquad />
            </div>
        </div>

        <div id="home-top-squads" class="flex-column">
            <div class="flex-row align-center">
                <div class="header-standard m-left" style="padding-left:0">TOP MATCHES</div>
                <a href="" style="text-decoration: none; color:var(--secondary-light); padding: 8px; border: 1px solid var(--secondary-light);">More Matches</a>
            </div>
            <div id="home-top-squad-list" class="card-grid">
                <CardSquad />
                <CardSquad />
                <CardSquad />
            </div>
        </div>
    </div>

<!--     <div id="home-examples" class="global-padding">
aaaaaaaaa
    </div>

    <div id="home-register" class="global-padding">
aaaaaaaaa
    </div> -->

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue-demi";
import CardSquad from "@/components/r_user_profile/CardSquad.vue";

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
    /* width: 100vw; */
    min-height: calc(100vh - var(--navbar-height));
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
    font-family: Unispace, Verdana, Geneva, Tahoma, sans-serif;
    font-size: var(--font-size-1);
    font-weight: 300;
    /* color: var(--light); */
    text-align: left;
    margin-bottom: 16px;
}

.home-description{
    /* font-family: Nunito, Verdana, Geneva, Tahoma, sans-serif; */
    text-align: left;
    font-size: var(--font-size-4);
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

/*     background: url("../assets/hero.jpg");
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position-y: 80%; */

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

#presentation-match{
    background: url("../assets/img-squads.jpg");
    /* background-repeat: no-repeat; */
    background-attachment: fixed;
    background-size: 100vw;
    background-position-y: 40%;
}

#presentation-squad{

}


/////////////////

#home-content{
    padding-top: 32px;
    padding-bottom: 32px;
}

</style>