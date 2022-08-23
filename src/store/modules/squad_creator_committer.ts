import store from "..";

export const Committer = {

setPitchColor: (pitchColor: string) => store.commit('squadCreatorStore/setPitchColor', {pitchColor}),
setLineColor: (lineColor: string) => store.commit('squadCreatorStore/setLineColor', {lineColor}),

setPitchWidth: (width: number) => store.commit('squadCreatorStore/setPitchWidth', {width}),
setPitchHeight: (height: number) => store.commit('squadCreatorStore/setPitchHeight', {height}),

setCanvasWidth: (width: number) => store.commit('squadCreatorStore/setCanvasWidth', {width}),
setCanvasHeight: (height: number) => store.commit('squadCreatorStore/setCanvasHeight', {height}),
setCanvasScale: (scale: number) => store.commit('squadCreatorStore/setCanvasScale', {scale}),

setPitchStyle: (style: number) => store.commit('squadCreatorStore/setPitchStyle', {style}),
}