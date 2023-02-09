<template>
    
<div id="home">

    <div id="home-hero" class="position-relative global-padding flex-column" :style="`height:100vh;`">

        <div id="hero-background" class="position-absolute" style="top:0;left:0; height:100%; width: 100vw; box-shadow: 0 0 4px var(--dark); filter: brightness(0.2);">
        </div>

        <div class="position-absolute flex-column flex-grow align-items-center justify-content-center" style="height:33%; top:0;">
            <img id="soccer-studio-logo" class="m-center-v" src="@/assets/svg/logo-full.svg" alt="">
        </div>

        <div class="position-absolute flex-column" style=" max-width: 900px; height:67%; top:33%;">
            <div class="home-header flex-column" style="height: 33%;">
                <span class="m-center-v">RECREATE YOUR FAVOURITE MOMENTS IN FOOTBALL AND SHARE THEM WITH THE WORLD</span>
            </div>
            <div id="hero-buttons">
                <router-link to="/editor">
                    <button class="btn-square-secondary-light" style="filter: drop-shadow(1px 1px 2px var(--dark)); font-weight: 900;">
                        CREATE A SCENE
                    </button>
                </router-link>
                <router-link to="/squad-creator">
                    <button class="btn-square-primary" style="filter: drop-shadow(1px 1px 2px var(--dark)); font-weight: 900;">
                        CREATE A SQUAD
                    </button>
                </router-link>
            </div>
            <div class="m-center-v">
                &copy; 2023 <a href="https://github.com/Leelah412">Leelah412</a>
            </div>
        </div>

    </div>

    <div id="home-content" class="flex-column global-padding">
        
    </div>

</div>

</template>


<script lang="ts" setup>
import { onMounted, onUnmounted } from "@vue/runtime-core";


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

#home{
    box-sizing: border-box;
    min-height: calc(100vh - var(--navbar-height));
    overflow: hidden;
    color: var(--light);
}

#home-hero{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    box-shadow: inset 0 0 4px #000;
}

#hero-buttons{
    display: flex;
    flex-direction: column;
    margin: 0 auto auto auto;
    padding: 0 32px;
    width: calc(100% - 64px);
    a{
        margin-bottom: 16px;
        button{
            width:100%;
        }
    }
}

.home-header{
    font-family: Unispace, Verdana, Geneva, Tahoma, sans-serif;
    font-size: var(--font-size-2);
    font-weight: 300;
    padding: 0 32px;
    span{
        margin-bottom: auto;
        filter: drop-shadow(0 0 4px var(--dark));
    }
}


.home-description{
    /* font-family: Nunito, Verdana, Geneva, Tahoma, sans-serif; */
    font-size: var(--font-size-3);
}


#soccer-studio-logo{
    height: 96px;
    filter: drop-shadow(0 0 8px var(--dark));
}

#hero-background{
    background: url("../assets/img-squads.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100hw;
    background-position-y: 50%;
    background-position-x: 50%;
}

@media screen and (min-width: 601px){
    .home-header{
        font-size: var(--font-size-1);
    }
    #hero-buttons{
        flex-direction: row;
        width: auto;
        a{
            margin: 0 16px 16px 16px;
            button{
                width:100%;
            }
        }
    }
    #soccer-studio-logo{
        height: 128px;
    }
}

@media screen and (min-width: 1201px){
    .home-header{
        padding: 0;
    }
}

/////////////////

#home-content{
    //padding-top: 32px;
    //padding-bottom: 32px;
}

</style>