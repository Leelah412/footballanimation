<template>

  <Navbar v-if="route.name !== 'editor'"/>

  <router-view />

  <footer v-if="route.name !== 'editor'">

  </footer>

</template>

<script lang="ts" setup>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";

const route = useRouter().currentRoute;

// TODO: login on startup with access token


</script>



<style lang="scss">

*{
  margin: 0;
  padding: 0;

  --primary: #0b530b;
  --primary-dark: #021a02;
  --secondary-light: #167e75;
  --secondary: #105650;
  --secondary-dark: #0a3633;
  --accent-light: #ac6e29;
  --accent: #9c5e17;
  --accent-dark: #643907;

  --red: #b71c1c;
  --blue: #0d47a1;
  --green: #1b5e20;

  --dark: #111;
  --dark-2: #1a1a1a;
  --dark-3: #222;
  --dark-4: #333;
  --dark-5: #444;
  --dark-6: #515151;

  --light: #f7f7f7;
  --light-2: #ddd;
  --light-3: #ccc;
  --light-4: #aaa;
  --light-5: #999;
  --light-6: #888;

  // font sizes
  --font-size-0: 48px;
  --font-size-1: 32px;      // huge
  --font-size-2: 24px;      // big header
  --font-size-3: 16px;      // header
  --font-size-4: 12px;      // standard
  --font-size-5: 10px;      // smaller
  --font-size-6: 8px;       // tiny

    // global margins on the side
  --global-margin: 16px;

  @media screen and (min-width: 1200px){
    --global-margin: calc((100vw - 1200px) / 2);      
  }
}

body{
  background: var(--dark);
}

button{
  @extend .noselect;
  border: none;
  background: none;
  cursor: pointer;
  transition-duration: 0.2s;
}

.input-number{
  border: none;
  border-radius: 4px;
  padding: 4px;
  background: #f7f7f7;
  color: #333;
  box-shadow: inset 0 0 2px #000;
  text-align: center;
  
}

.input-number-dark{
  @extend .input-number;
  background: #1a1a1a;
  color: #ccc;
}

#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ccc;
  min-height: 100vh;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

svg{
  @extend .noselect;
  *{
    @extend .noselect;
  }
}

.flex-row{
  display: flex;
  flex-direction: row;
}

.flex-column{
  display: flex;
  flex-direction: column;
}

.flex-grow{
  flex-grow: 100;
}

.align-center{
  align-items: center;
  justify-content: center;
}

.position-relative{
  position: relative;
}

.position-absolute{
  position: absolute;
}

.m-left{
  margin-right: auto;
}
.m-right{
  margin-left: auto;
}
.m-top{
  margin-bottom: auto;
}
.m-bottom{
  margin-top: auto;
}
.m-center-v{
  margin-top: auto;
  margin-bottom: auto;
}
.m-center-h{
  margin-left: auto;
  margin-right: auto;
}

.width-100{
  width: 100%;
}

.height-100{
  height: 100%;
}

.global-margin{
  margin-left: var(--global-margin);
  margin-right: var(--global-margin);
}

.global-padding{
  padding-left: var(--global-margin);
  padding-right: var(--global-margin);
}

.center-container{
  margin: auto;
  padding: 32px;
  width: 384px;
/*     @media screen and (min-width: 540px) {
      width: 384px;
  } */
  div{
    margin-bottom: 16px;
  }

  background: var(--dark-2);
  box-shadow: inset 0 0 1px #000;
  border-radius: 4px;
}

.form-animation-container{
    --bg-color: var(--dark-2);
    --border-color: var(--dark-3);
    --color: var(--light-3);
    --size: var(--font-size-5);
    --input-height: 24px;

    position: relative;
    height: var(--input-height);

    .form-animation-label{
        pointer-events: none;
        position: absolute;
        top: 8px;
        left: 8px;
        color: var(--light-6);
        font-size: var(--font-size-4);
        transition-duration: 0.25s;
        
        &.focused{
            color: var(--light-5);
            top: calc(-50% - 8px);              // -8px for a decent margin between label and input
            left: 0;
            /* font-size: var(--font-size-5); */
            /* font-weight: 600; */
        }
    }

    .form-animation-input{
        position: absolute;
        top: 0;
        left: 0;
        padding: 8px;
        box-sizing: border-box;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button{
            -webkit-appearance: none;
            margin: 0;
        }
        -moz-appearance: textfield;

        &[type=number]{
            text-align: center;
        }

        background: var(--bg-color);
        border-radius: 4px;
        border-color: var(--border-color);
        outline: none;
        color: var(--color);

        &:focus{
            --bg-color: var(--dark-3);
            --border-color: var(--accent-dark);
        }
    }
}

.label-checkbox{
  margin-left: 8px;
}

input{
  background: var(--light);
  border: 1px solid var(--light-5);
  border-radius: 4px;
  padding: 4px;
  color: var(--dark-4);

  &[type=color]{
    background: none;
    border: none;   

    -webkit-appearance: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: none;
    }

    &::-moz-color-swatch {
      border: none;
    }
  }
}

.input-dark{
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    background: var(--dark-4);
    border: 1px solid var(--dark);
    border-radius: 4px;
    padding: 4px 8px;
    color: #ccc;
    -moz-appearance: textfield;

    &[type=number]{
      width: 32px;
      text-align: center;
    }
}

.input-dark-2{
  @extend .input-dark;
  padding: 8px;
  outline: none;
  background: var(--dark-2);
  border-color: var(--dark-3);
  &:focus{
    background: var(--dark-3);
    border-color: var(--accent-dark);
  }
}

.label-over{
  text-align: left;
  font-size: var(--font-size-5);
  color: var(--light-5);
  font-weight: 600;
}

.label-right{
  @extend .label-over;
  font-size: var(--font-size-4);
  font-weight: 400;
  margin-left: 8px;
}

.input-select{
  padding: 8px;
  background: var(--dark);
  color: var(--light);
  border: 1px solid var(--dark-3);
  border-radius: 4px;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover{
      filter: brightness(1.2);
  }

  option{
      /* padding: 8px; */
      &:active{
          background: var(--dark);
      }
  }
}

.input-bottom-line{
  border: none;
  border-bottom: 1px solid var(--dark-6);
  border-radius: 0;
  background: none;
  outline: none;
  font-size: var(--font-size-3);
  color: var(--light);

  &:focus{
    border-bottom-color: var(--accent);
  }
}

.btn-standard{
  letter-spacing: 1.2px;
  padding: 8px;
  font-size: var(--font-size-4);
  color: var(--light);

  &:hover{
    border-bottom: 2px solid var(--accent);
    background: var(--dark-2);
  }
}

.btn-standard-active{
  @extend .btn-standard;
  border-bottom: 2px solid var(--accent);
  background: var(--accent);
  &:hover{
    background: var(--accent);
  }
}

.btn-secondary{
  /* background: var(--secondary); */
  border-radius: 100px;
  font-size: var(--font-size-4);
  /* font-weight: 600; */
  letter-spacing: 1.2px;
  color: var(--secondary-light);
  padding: 6px 4px;
  border: 1px solid var(--secondary-light);

  &:hover{
    background: var(--secondary-light);
    color: var(--light-3);
  }
}

.btn-bootstrap-primary{
  border-radius: 6px;
  padding: 12px;
  color: var(--light);
  font-size: var(--font-size-3);
  box-shadow: 0 0 6px var(--dark);
  background: var(--primary);
  &:hover{
    filter: brightness(1.2);
  }
}

.btn-bootstrap-secondary{
  @extend .btn-bootstrap-primary;
  background: var(--secondary);
}

.btn-bootstrap-secondary-light{
  @extend .btn-bootstrap-primary;
  background: var(--secondary-light);
  
}

.btn-bootstrap-accent{
  @extend .btn-bootstrap-primary;
  background: var(--accent);
  
}

.btn-bootstrap-accent-light{
  @extend .btn-bootstrap-primary;
  background: var(--accent-light);
  
}

.btn-bootstrap-accent-dark{
  @extend .btn-bootstrap-primary;
  background: var(--accent-dark);
  
}

.header-standard{
  font-family: Unispace;
  font-size: var(--font-size-2);
  padding: 32px;
  
}

.header-standard-p-16{
  @extend .header-standard;
  padding: 16px;
}

.span-placeholder{
  font-style: italic;
  opacity: 0.8;
}



.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

// tooltip (taken from w3schools.com)
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


.pull-bar-container{
  display: flex;
  flex-direction: row;

  @extend .noselect;
  *{
    @extend .noselect;
  }
  width: 100%;
  height: 4px;

  .pull-bar{
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 4px;
    /* border: 1px solid var(--dark-3); */
    border-radius: 100px;
  /*         border-left: 2px solid var(--accent);
        border-right: 2px solid var(--accent); */
        box-sizing: border-box;
    background: var(--secondary-light);
    box-shadow: 0 0 2px var(--dark);
    margin: 14px 0;

    .bar{
        cursor: pointer;
        position: absolute;
        top: -8px;
        left: -4px;
        width: 8px;
        height: 16px;
        background: var(--accent-light);
        border-radius: 100px;
        border: 2px solid var(--accent);
        box-shadow: 0 0 4px var(--dark);

        &:hover{
            filter: brightness(1.2);
        }
    }
  }

  .pull-bar-arrow{
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin: 0 8px;
    filter: drop-shadow(0 0 2px #000);

    &:hover{
      filter: brightness(1.2);
    }
  }
}

.card{
  cursor: pointer;
  background: var(--dark);
  box-shadow: 0 0 8px var(--dark);

  $width: 360px;
  width: $width;
  height: $width * (9/16);
  border-radius: 4px;
  transition-duration: 0.2s;
  
  overflow: hidden;

  &:hover{
    transform: scale(1.05);
    box-shadow: 0 0 8px var(--dark), 0 0 2px var(--accent);
  }
}

.card-16-9{
  @extend .card;
}


.card-4-3{
  @extend .card;
  
  $width: 360px;
  width: $width;
  height: $width * (3/4);
}

.error-msg{
  color: var(--red);
  font-size: var(--font-size-4);
  text-align: left;
}

</style>
