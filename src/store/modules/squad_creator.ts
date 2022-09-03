import { PlayerStyle } from "@/components/helper/enums";
import FormationList, { Formation } from "@/components/helper/FormationList";
import Vector2 from "@/components/math/Vector2";
import Player, { PlayerList } from "@/components/model/Player";
import { Committer } from "./squad_creator_committer";


export interface UndoRedo{
    ref: any                    // reference to the object holding the value
    primitive: string | null    // value belongs to primitive => additionally access primitive variable belonging to reference object
    value: any                  // prev. value of object
}

export interface Settings{
    playerStyle: PlayerStyle
    circleRadius: number            // in px; only relevant, if player style is circle
    circleStyle: number

    showNumbers: boolean
    showNames: boolean

    showLogo: boolean
    showSquadName: boolean
    showFormation: boolean          // show formation name on pitch
    teamColors: string[]            // team colors used to determine the colors of the circle and anything else; must have at least 2 colors!
    logoPosition: Vector2

    pitchSize: Vector2              // width, height of pitch in meters
    pitchStyle: number              // basically the background pattern on the pitch
    pitchColor: string              // color of the pitch
    lineColor: string               // color of the lines on the pitch
    pitchOrientation: string        // 'horizontal' or 'vertical'; default: vertical

    canvasWidth: number
    canvasHeight: number
    canvasScale: number             

    lockPositions: boolean          // if true, only able to move players on predetermined positions (like in FM)

    firstTeamCount: number          // number of players in first team (max. 11 players)
    benchCount: number

    useBench: boolean               // if true, bench players are shown too
}

export interface State{
    version: string,

    squadName: string
    formationKey: string               // TODO: move to settings; key of the selected formation
    formationName: string              // TODO: move to settings; name of the formation

    firstTeam: PlayerList
    bench: PlayerList
    reserves: PlayerList

    settings: Settings

    undoList: UndoRedo[]
    redoList: UndoRedo[]
}

const defaultState = (): State => {
    return {
        version: '1.0.0',

        squadName: "New Squad",
        formationKey: Object.keys(FormationList)[0],
        formationName: '',

        firstTeam: {},
        bench: {},
        reserves: {},

        settings: {
            playerStyle: PlayerStyle.CIRCLE,
            circleRadius: 8,
            circleStyle: 0,
        
            showNumbers: true,
            showNames: true,
        
            showLogo: true,
            showSquadName: true,
            showFormation: true,
            teamColors: ['#1a1a1a', '#f7f7f7'],
            logoPosition: new Vector2(),
        
            pitchSize: new Vector2(105,68),
            pitchStyle: 0,
            pitchColor: '#102e12',
            lineColor: '#f7f7f7',
            pitchOrientation: 'vertical',

            canvasWidth: 0,
            canvasHeight: 0,
            canvasScale: 1,

            lockPositions: true,
        
            firstTeamCount: 11,
            benchCount: 0,

            useBench: false
        },

        undoList: [],
        redoList: []

    }
}

///////////////
// MUTATIONS //
///////////////

const STORAGE_PATH = 'squadCreator';


export const mutations = {

    // save state in local storage or file
    saveSquad(state: State, args: {toFile: boolean, path: string} = {toFile: false, path: ''}){

        var firstTeam: any[] = [];
        Object.values(state.firstTeam).forEach((pl: Player) => {
            firstTeam.push({
                name: pl.name,
                number: pl.number,
                positionX: pl.position.x,
                positionY: pl.position.y,
                positionName: pl.positionName,
                positionShort: pl.positionShort,
            })
        });
    
        var save: any = {
            version: '1.0.0',
    
            squadName: state.squadName,
            formationKey: state.formationKey,
            formationName: state.formationName,
            firstTeam,
            bench: [],
            reserves: [],

            settings: {
                playerStyle: PlayerStyle[state.settings.playerStyle],
                circleRadius: state.settings.circleRadius,
                circleStyle: state.settings.circleStyle,
            
                showNumbers: state.settings.showNumbers,
                showNames: state.settings.showNames,
            
                showLogo: state.settings.showLogo,
                showSquadName: state.settings.showSquadName,
                showFormation: state.settings.showFormation,
                teamColors: state.settings.teamColors,
                logoPosition: {x: state.settings.logoPosition.x, y: state.settings.logoPosition.y},
            
                pitchSize: {x: state.settings.pitchSize.x, y: state.settings.pitchSize.y},
                pitchStyle: state.settings.pitchStyle,
                pitchColor: state.settings.pitchColor,
                lineColor: state.settings.lineColor,
                pitchOrientation: state.settings.pitchOrientation,
    
                // following matter only internally and are calculated on runtime
                // TODO: move them away from "settings" to something like "htmlSettings", signalling internal use
/*                 canvasWidth: state.settings.canvasWidth,
                canvasHeight: state.settings.canvasHeight,
                canvasScale: state.settings.canvasScale, */
    
                lockPositions: state.settings.lockPositions,
            
                // TODO: prob. not relevant, as we will use "visible" to check, if someone can be seen on pitch or not
                //firstTeamCount: state.settings.firstTeamCount,
                benchCount: state.settings.benchCount,
    
                useBench: state.settings.useBench
            }    
        }

        var json = JSON.stringify(save);
        localStorage.setItem(STORAGE_PATH, json);

        if(args.toFile){
            var myBlob = new Blob([json], {type: 'application/json'});
            
            var url = window.URL.createObjectURL(myBlob);
            var anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = args.path;
            if(args.path === ''){
                anchor.download = 'soccer_studio_squad_' + state.squadName + '.json';
            }
            
            anchor.click();
            window.URL.revokeObjectURL(url);
            document.removeChild(anchor);
        }
    },

    // load squad from local storage or file
    // when loading from file, interpret the given 'data' argument
    loadSquad(state: State, args: {data: string | null} = {data: null}){
        var data: string;
        if(args.data !== null){
            data = args.data;
        }
        else{
            const ls = localStorage.getItem(STORAGE_PATH);
            if(ls === null) return;
            data = ls;
        }

        if(data === '') return;

        const dec = JSON.parse(data);
        
        if(typeof dec.version !== 'string') return;
        if(typeof dec.squadName !== 'string') return;
        if(typeof dec.formationKey !== 'string') return;
        if(typeof dec.formationName !== 'string') return;
        if(!Array.isArray(dec.firstTeam)) return;
    
        state.squadName = dec.squadName;
        state.formationKey = dec.formationKey;
        state.formationName = dec.formationName;
    
        state.firstTeam = {};
        // load the players
        var player: Player;
        dec.firstTeam.forEach((pl:any)=>{
            player = new Player(new Vector2(pl.positionX, pl.positionY));
            player.name = pl.name;
            player.number = pl.number;
            player.positionName = pl.positionName;
            player.positionShort = pl.positionShort;
    
            state.firstTeam[player.id] = player;
        })

        if(dec.settings === undefined) return;

        if(typeof dec.settings.playerStyle === 'string') state.settings.playerStyle = dec.settings.playerStyle;
        if(typeof dec.settings.circleRadius === 'number') state.settings.circleRadius = dec.settings.circleRadius;
        if(typeof dec.settings.circleStyle === 'number') state.settings.circleStyle = dec.settings.circleStyle;

        if(typeof dec.settings.showNumbers === 'boolean') state.settings.showNumbers = dec.settings.showNumbers;
        if(typeof dec.settings.showNames === 'boolean') state.settings.showNames = dec.settings.showNames;

        if(typeof dec.settings.showLogo === 'boolean') state.settings.showLogo = dec.settings.showLogo;
        if(typeof dec.settings.showSquadName === 'boolean') state.settings.showSquadName = dec.settings.showSquadName;
        if(typeof dec.settings.showFormation === 'boolean') state.settings.showFormation = dec.settings.showFormation;
        if(Array.isArray(dec.settings.teamColors)) state.settings.teamColors = dec.settings.teamColors;
        if(dec.settings.logoPosition !== undefined){
            const x = dec.settings.logoPosition.x, y = dec.settings.logoPosition.y;
            if(x !== undefined && y !== undefined)
                state.settings.logoPosition = new Vector2(x, y);
        }
        
        if(dec.settings.pitchSize !== undefined){
            const x = dec.settings.pitchSize.x, y = dec.settings.pitchSize.y;
            if(x !== undefined && y !== undefined)
                state.settings.pitchSize = new Vector2(x, y);
        }
        if(typeof dec.settings.pitchStyle === 'number') state.settings.pitchStyle = dec.settings.pitchStyle;
        if(typeof dec.settings.pitchColor === 'string') state.settings.pitchColor = dec.settings.pitchColor;
        if(typeof dec.settings.lineColor === 'string') state.settings.lineColor = dec.settings.lineColor;
        if(typeof dec.settings.pitchOrientation === 'string') state.settings.pitchOrientation = dec.settings.pitchOrientation;

        if(typeof dec.settings.lockPositions === 'boolean') state.settings.lockPositions = dec.settings.lockPositions;
        if(typeof dec.settings.benchCount === 'number') state.settings.benchCount = dec.settings.benchCount;
        if(typeof dec.settings.useBench === 'boolean') state.settings.useBench = dec.settings.useBench;


    },

    // reset everything back to default
    setDefault(state: State, args: {}){
        console.log("state before: ");
        console.log(state);
        
        state = defaultState();

        console.log("state after: ");
        console.log(state);
        
    },

    // undo an action
    undo(state: State, args: {}){

        console.log("undoing");        

        if(state.undoList.length === 0) return;
        const u: UndoRedo | undefined = state.undoList.pop();
        if(u === undefined) return;

        var rf: any = u.ref;
        if(u.primitive !== null){
            // push current value into redo list
            const curVal = rf[u.primitive];
            state.redoList.push({
                ref: rf,
                primitive: u.primitive,
                value: curVal
            })
            // finish undo
            rf[u.primitive] = u.value;
            return;
        }
        
        // push current value into redo list
        const curVal = rf;
        state.redoList.push({
            ref: rf,
            primitive: null,
            value: curVal
        })
        // finish undo
        rf = u.value;
    },
    
    // redo an action
    redo(state: State, args: {}){

        console.log("redoing");
        

        if(state.redoList.length === 0) return;
        const u: UndoRedo | undefined = state.redoList.pop();
        if(u === undefined) return;

        var rf: any = u.ref;
        if(u.primitive !== null){
            // push current value into redo list
            const curVal = rf[u.primitive];
            state.undoList.push({
                ref: rf,
                primitive: u.primitive,
                value: curVal
            })
            // finish undo
            rf[u.primitive] = u.value;
            return;
        }
        
        // push current value into redo list
        const curVal = rf;
        state.undoList.push({
            ref: rf,
            primitive: null,
            value: curVal
        })
        // finish undo
        rf = u.value;
    },
    
    pushToUndoList(state: State, args: {ref: any, primitive: string | null, value: any}){
        
        console.log("pushing to undo list");
        
        state.undoList.push({
            ref: args.ref,
            primitive: args.primitive,
            value: args.value
        })

        state.redoList = [];
    },

    setPlayerStyle(state: State, args: {style: PlayerStyle}){
        Committer.pushToUndoList(state.settings, 'playerStyle', state.settings.playerStyle);
        state.settings.playerStyle = args.style;
    },

    setCircleStyle(state: State, args: {style: PlayerStyle}){
        
        if(args.style < 0){
            if(state.settings.circleStyle === 0) return;
            
            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = 0;
            return;
        }

        const prev = state.settings.circleStyle;
        state.settings.circleStyle = args.style;

        const styles = document.getElementsByClassName('sc-circle-style');
        if(styles === undefined || styles === null) return;
        

        if(styles.length === 0){
            if(state.settings.circleStyle === 0) return;

            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = 0;
            return;
        }

        if(args.style >= styles.length/11){
            if(state.settings.circleStyle === styles.length/11 - 1) return;

            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = styles.length/11 - 1;
        }
        
        Committer.pushToUndoList(state.settings, 'circleStyle', prev);
    },

    setPitchColor(state: State, args: {pitchColor: string}){
        if(state.settings.pitchColor === args.pitchColor) return;

        Committer.pushToUndoList(state.settings, 'pitchColor', state.settings.pitchColor);
        state.settings.pitchColor = args.pitchColor;
    },

    setLineColor(state: State, args: {lineColor: string}){
        if(state.settings.lineColor === args.lineColor) return;

        Committer.pushToUndoList(state.settings, 'lineColor', state.settings.lineColor);
        state.settings.lineColor = args.lineColor;
    },

    setPitchWidth(state: State, args: {width: number}){
        if(args.width < 90){
            if(state.settings.pitchSize.x === 90) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize);
            state.settings.pitchSize.x = 90;
            return;
        }
        if(args.width > 120){
            if(state.settings.pitchSize.x === 120) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize);
            state.settings.pitchSize.x = 120;
            return;
        }

        Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize);
        state.settings.pitchSize.x = args.width;
    },

    setPitchHeight(state: State, args: {height: number}){
        if(args.height < 60){
            if(state.settings.pitchSize.y === 60) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize);
            state.settings.pitchSize.y = 60;
            return;
        }
        if(args.height > 90){
            if(state.settings.pitchSize.y === 90) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize);
            state.settings.pitchSize.y = 90;
            return;
        }

        Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize);
        state.settings.pitchSize.y = args.height;
        
    },

    // TODO: canvas stuff doesnt belong to settings
    setCanvasWidth(state: State, args: {width: number}){
        state.settings.canvasWidth = args.width;
    },
    setCanvasHeight(state: State, args: {height: number}){
        state.settings.canvasHeight = args.height;
    },
    setCanvasScale(state: State, args: {scale: number}){
        state.settings.canvasScale = args.scale;
    },


    setPitchStyle(state: State, args: {style: number}){
        if(args.style < 0){
            if(state.settings.pitchStyle === 0) return;

            Committer.pushToUndoList(state.settings, 'pitchStyle', state.settings.pitchStyle);
            state.settings.pitchStyle = 0;
            return;
        }

        const prev = state.settings.pitchStyle;
        state.settings.pitchStyle = args.style;

        const styles = document.getElementsByClassName('sc-pitch-style');
        if(styles === undefined || styles === null) return;

        if(styles.length === 0){
            if(state.settings.pitchStyle === 0) return;
            Committer.pushToUndoList(state.settings, 'pitchStyle', state.settings.pitchStyle);
            state.settings.pitchStyle = 0;
            return;
        }

        if(args.style >= styles.length){
            if(state.settings.pitchStyle === styles.length - 1) return;
            Committer.pushToUndoList(state.settings, 'pitchStyle', state.settings.pitchStyle);
            state.settings.pitchStyle = styles.length - 1;
        }

        Committer.pushToUndoList(state.settings, 'pitchStyle', prev);
    },
}

export const getters = {

}

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    getters
}