import { PlayerStyle } from "@/components/helper/enums";
import store from "..";

const storePath = 'squadCreatorStore/';

export const Committer = {

saveSquad: (toFile: boolean = false, path: string = '') => store.commit(storePath + 'saveSquad', {toFile, path}),
loadSquad: (data: string | null = null) => store.commit(storePath + 'loadSquad', {data}),

setDefault: () => store.commit(storePath + 'setDefault', {}),

undo: () => store.commit(storePath + 'undo', {}),
redo: () => store.commit(storePath + 'redo', {}),

pushToUndoList: (ref: any, primitive: string | null, value: any) => store.commit(storePath + 'pushToUndoList', {ref, primitive, value}),

//////////////////
// NON-SETTINGS //
//////////////////

setSquadName: (squadName: string) => store.commit(storePath + 'setSquadName', {squadName}),
changeSquadLogo: (squadLogo: Blob | MediaSource |null) => store.commit(storePath + 'changeSquadLogo', {squadLogo}),

//////////////
// SETTINGS //
//////////////

setPlayerStyle: (style: PlayerStyle) => store.commit(storePath + 'setPlayerStyle', {style}),
setCircleStyle: (style: number) => store.commit(storePath + 'setCircleStyle', {style}),

setPitchWidth: (width: number) => store.commit(storePath + 'setPitchWidth', {width}),
setPitchHeight: (height: number) => store.commit(storePath + 'setPitchHeight', {height}),
setPitchStyle: (style: number) => store.commit(storePath + 'setPitchStyle', {style}),
setPitchColor: (pitchColor: string) => store.commit(storePath + 'setPitchColor', {pitchColor}),
setLineColor: (lineColor: string) => store.commit(storePath + 'setLineColor', {lineColor}),

setCanvasWidth: (width: number) => store.commit(storePath + 'setCanvasWidth', {width}),
setCanvasHeight: (height: number) => store.commit(storePath + 'setCanvasHeight', {height}),
setCanvasScale: (scale: number) => store.commit(storePath + 'setCanvasScale', {scale}),


}

export const Getter = {
}