import { PlayerStyle } from "@/components/util/enums";
import Vector2 from "@/components/math/Vector2";
import Player from "@/components/model/Player";
import store from "..";
import { UndoRedo } from "./squad_creator";

const storePath = 'squadCreatorStore/';

export const Committer = {

saveSquad: (toFile: boolean = false, path: string = '') => store.commit(storePath + 'saveSquad', {toFile, path}),
loadSquad: (data: string | null = null) => store.commit(storePath + 'loadSquad', {data}),

setDefault: () => store.commit(storePath + 'setDefault', {}),

undo: () => store.commit(storePath + 'undo', {}),
redo: () => store.commit(storePath + 'redo', {}),

pushToUndoList: (ref: any, primitive: string | number | null, value: any) => store.commit(storePath + 'pushToUndoList', {ref, primitive, value}),
pushMultipleToUndoList: (list: UndoRedo[]) => store.commit(storePath + 'pushMultipleToUndoList', {list}),

resetUndoList: () => store.commit(storePath + 'resetUndoList', {}),
resetRedoList: () => store.commit(storePath + 'resetRedoList', {}),

//////////////////
// NON-SETTINGS //
//////////////////

setSquadName: (squadName: string) => store.commit(storePath + 'setSquadName', {squadName}),
changeFormation: (formationKey: string) => store.commit(storePath + 'changeFormation', {formationKey}),
setFormationName: (name: string) => store.commit(storePath + 'setFormationName', {name}),
changeSquadLogo: (squadLogo: Blob | MediaSource |null) => store.commit(storePath + 'changeSquadLogo', {squadLogo}),

// PLAYER

replaceDummyWithPlayer: (player: Player, name: string, number: number, avatar: Blob | string | null) => store.commit(storePath + 'replaceDummyWithPlayer', {player, name, number, avatar}),
removePlayerFromFirstTeam: (player: Player) => store.commit(storePath + 'removePlayerFromFirstTeam', {player}),
setPlayerName: (player: Player, name: string) => store.commit(storePath + 'setPlayerName', {player, name}),
setPlayerNumber: (player: Player, number: string) => store.commit(storePath + 'setPlayerNumber', {player, number}),
setPlayerAvatar: (player: Player, avatar: string) => store.commit(storePath + 'setPlayerAvatar', {player, avatar}),

//////////////
// SETTINGS //
//////////////

setPlayerStyle: (style: PlayerStyle) => store.commit(storePath + 'setPlayerStyle', {style}),
setCircleStyle: (style: number) => store.commit(storePath + 'setCircleStyle', {style}),

// VISUAL

setShowNumbers: (showNumbers: boolean) => store.commit(storePath + 'setShowNumbers', {showNumbers}),
setShowNames: (showNames: boolean) => store.commit(storePath + 'setShowNames', {showNames}),
setShowLogo: (showLogo: boolean) => store.commit(storePath + 'setShowLogo', {showLogo}),
setShowSquadName: (showSquadName: boolean) => store.commit(storePath + 'setShowSquadName', {showSquadName}),
setShowFormation: (showFormation: boolean) => store.commit(storePath + 'setShowFormation', {showFormation}),
setTeamColor: (index: number, color: string) => store.commit(storePath + 'setShowFormation', {index, color}),
setLogoPosition: (logoPosition: Vector2) => store.commit(storePath + 'setShowFormation', {logoPosition}),

// PITCH

setPitchWidth: (width: number) => store.commit(storePath + 'setPitchWidth', {width}),
setPitchHeight: (height: number) => store.commit(storePath + 'setPitchHeight', {height}),
setPitchOrientation: (orientation: string) => store.commit(storePath + 'setPitchOrientation', {orientation}),
setPitchStyle: (style: number) => store.commit(storePath + 'setPitchStyle', {style}),
setPitchColor: (pitchColor: string) => store.commit(storePath + 'setPitchColor', {pitchColor}),
setLineColor: (lineColor: string) => store.commit(storePath + 'setLineColor', {lineColor}),

setCanvasWidth: (width: number) => store.commit(storePath + 'setCanvasWidth', {width}),
setCanvasHeight: (height: number) => store.commit(storePath + 'setCanvasHeight', {height}),
setCanvasScale: (scale: number) => store.commit(storePath + 'setCanvasScale', {scale}),


}

export const Getter = {

}