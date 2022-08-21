import { PlayerStyle } from "@/components/helper/enums";
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
    showTeamName: boolean
    showFormation: boolean          // show formation name on pitch
    teamColors: string[]            // team colors used to determine the colors of the circle and anything else
    logoPosition: Vector2

    pitchSize: Vector2              // width, height of pitch in meters
    pitchStyle: number          
    pitchColors: string[]
    pitchOrientation: string        // 'horizontal' or 'vertical'; default: vertical

    lockPositions: boolean          // if true, only able to move players on predetermined positions (like in FM)

    useBench: boolean               // if true, bench players are shown too
}

export interface State{
    squadName: string,

    team: Team,
    firstTeam: PlayerList,
    bench: PlayerList,
    reserves: PlayerList,

    settings: Settings
}

///////////////
// MUTATIONS //
///////////////

export const mutations = {

}


export default {
    namespaced: true,
    state: {
        squadName: "New Squad",

        team: new Team(),
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
            showTeamName: false,
            showFormation: true,
            teamColors: [],
            logoPosition: new Vector2(),
        
            pitchSize: new Vector2(),
            pitchStyle: 0,
            pitchColors: [],
            pitchOrientation: 'vertical',
        
            lockPositions: true,
        
            useBench: false
        }

    } as State,

    mutations: mutations
}