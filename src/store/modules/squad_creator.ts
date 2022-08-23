import { PlayerStyle } from "@/components/helper/enums";
import FormationList, { Formation } from "@/components/helper/FormationList";
import Vector2 from "@/components/math/Vector2";
import { PlayerList } from "@/components/model/Player";
import Team from "@/components/model/Team";

export interface Settings{
    playerStyle: PlayerStyle
    circleRadius: number            // in px; only relevant, if player style is circle
    circleStyle: number             

    showNumbers: boolean
    showNames: boolean

    showLogo: boolean
    showSquadName: boolean
    showFormation: boolean          // show formation name on pitch
    teamColors: string[]            // team colors used to determine the colors of the circle and anything else
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
    squadName: string,
    formation: string,
    formationName: string,

    firstTeam: PlayerList,
    bench: PlayerList,
    reserves: PlayerList,

    settings: Settings
}

///////////////
// MUTATIONS //
///////////////

export const mutations = {
    setPitchColor(state: State, args: {pitchColor: string}){
        state.settings.pitchColor = args.pitchColor;
    },
    setLineColor(state: State, args: {lineColor: string}){
        state.settings.lineColor = args.lineColor;
    },

    setPitchWidth(state: State, args: {width: number}){
        if(args.width < 90){
            state.settings.pitchSize.x = 90;
            return;
        }
        if(args.width > 120){
            state.settings.pitchSize.x = 120;
            return;
        }
        state.settings.pitchSize.x = args.width;
    },
    setPitchHeight(state: State, args: {height: number}){
        if(args.height < 60){
            state.settings.pitchSize.y = 60;
            return;
        }
        if(args.height > 90){
            state.settings.pitchSize.y = 90;
            return;
        }
        state.settings.pitchSize.y = args.height;
        
    },

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
            state.settings.pitchStyle = 0;
            return;
        }

        state.settings.pitchStyle = args.style;

        const styles = document.getElementsByClassName('sc-pitch-style');
        if(styles === undefined || styles === null) return;

        if(styles.length === 0){
            state.settings.pitchStyle = 0;
            return;
        }

        if(args.style >= styles.length){
            state.settings.pitchStyle = styles.length - 1;
        } 
    },
}


export default {
    namespaced: true,
    state: {
        squadName: "New Squad",
        formation: Object.keys(FormationList)[0],
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
            teamColors: [],
            logoPosition: new Vector2(),
        
            pitchSize: new Vector2(105,68),
            pitchStyle: 0,
            pitchColor: '#1b5e20',
            lineColor: '#f7f7f7',
            pitchOrientation: 'vertical',

            canvasWidth: 0,
            canvasHeight: 0,
            canvasScale: 1,

            lockPositions: true,
        
            firstTeamCount: 11,
            benchCount: 0,

            useBench: false
        }

    } as State,

    mutations: mutations
}