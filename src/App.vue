<template>
  <Editor />
</template>

<script lang="ts" setup>
import Editor from './components/Editor.vue';

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
  --font-size-1: 32px;      // huge whatever
  --font-size-2: 24px;      // big header
  --font-size-3: 16px;      // header
  --font-size-4: 12px;      // standard
  --font-size-5: 10px;      // smaller
  --font-size-6: 8px;       // tiny
}

html, body{
  overflow: hidden;
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

</style>
