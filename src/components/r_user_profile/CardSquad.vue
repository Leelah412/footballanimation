<template>
    
<div class="card-squad">

    <div class="card">

    </div>

    <div class="card-squad-bottom">

        <div class="card-squad-title">
            Squad Number #1
        </div>

        <div class="card-squad-likes">
            <span class="card-squad-likes-count">10.3K</span>
            <svg class="card-squad-likes-svg" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="var(--light-6)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>

        </div>

    </div>


</div>

</template>

<script lang="ts" setup>



</script>


<style lang="scss" scoped>

.card{
    background: var(--accent-light);
}

.card-squad-bottom{
    display: flex;
    flex-direction: row;
    margin-top: 8px;

}

.card-squad-title{
    text-align: left;
    font-size: var(--font-size-3);
    margin-right: auto;
}

.card-squad-likes{
    display: flex;
    flex-direction: row;
    .card-squad-likes-count{
        font-size: var(--font-size-3);
        color: var(--light-6);
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 4px;
    }

    .card-squad-likes-svg{

    }
}


</style>


