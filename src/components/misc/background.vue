<template>
    
<div id="background">
    
    <canvas id="background-canvas">
        
    </canvas>

</div>

</template>


<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import Vector2 from "@/components/math/Vector2";

const points = ref<Vector2[]>([]);

onMounted(()=>{

    resize();

    window.onresize = resize;
});

function resize(){
    const cnv = document.getElementById('background-canvas');
    if(cnv === undefined || cnv === null) return;

    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;

    const w = cnv.getBoundingClientRect().width;
    const h = cnv.getBoundingClientRect().height;
    const p_count = Math.floor(w * h * 0.0001);

    distribute(p_count, w, h);
    drawPoints(w, h, cnv.getContext("2d"));
}

function distribute(count: number, width: number, height: number){
    // start at center
    const start = new Vector2(width/2, height/2);
    var fib = 3, fib_prev = 2;
    var p_left = Math.floor(count);                     // turn it into an integer to be sure
    
    points.value = [];

    // distribute points around center based on fibonacci based circles
    while(p_left > 0){
        for(var i = 0; i < fib; i++){
            const angle = (Math.random() + i) * 360/fib;
            const dist = (Math.random() * (fib - fib_prev) + fib_prev) * 20;
            const x = Math.cos(angle / Math.PI) * dist + start.x;
            const y = Math.sin(angle / Math.PI) * dist + start.y;
            points.value.push(new Vector2(x, y));

            p_left--;
        }

        var tmp = fib;
        fib += fib_prev;
        fib_prev = tmp;

        if(fib > p_left) fib = p_left;

    }
}


function drawPoints(width: number, height: number, ctx){
    const w = Math.floor(width);
    const h = Math.floor(height);

    var closest: Vector2 = new Vector2(10000000, 10000000);
    var closest_dist: number = closest.length(new Vector2());
/*     for(var i = 0; i < w; i++){
        for(var j = 0; j < h; j++){
            // find the closest point
            for(var k = 0; k < points.value.length; k++){
                const l = points.value[k].length(new Vector2(i, j));
                if(l < closest_dist){
                    closest = points.value[k];
                    closest_dist = l;
                }
            }

            ctx.beginPath();
            ctx.arc(closest.x, closest.y, Math.random() * 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
    } */

}

</script>


<style lang="scss" scoped>

#background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1000000;
}

#background-canvas{
    
}


</style>
