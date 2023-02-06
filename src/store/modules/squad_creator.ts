import { KeyPlayerStyleMap, PlayerStyle } from "@/components/helper/enums";
import FormationList, { Formation, Position } from "@/components/helper/FormationList";
import Vector2 from "@/components/math/Vector2";
import Player, { PlayerList } from "@/components/model/Player";
import CircleStyles from "@/components/model/SquadCreator/standard/CircleStyles";
import { Committer } from "./squad_creator_committer";


export interface UndoRedo{
    ref: any                            // reference to the object holding the value
    primitive: string | number | null   // value belongs to primitive => additionally access primitive variable belonging to referenced object
    value: any                          // prev. value of object
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
    squadLogo: string               // path to the used logo (local/online doesn't matter)
    formationKey: string            // TODO: move to settings; key of the selected formation
    formationName: string           // TODO: move to settings; name of the formation

    firstTeam: PlayerList
    bench: PlayerList
    reserves: PlayerList

    settings: Settings

    undoList: (UndoRedo | UndoRedo[])[]
    redoList: (UndoRedo | UndoRedo[])[]
}

const defaultState = (): State => {
    return {
        version: '1.0.0',

        squadName: "New Squad",
        squadLogo: '',
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

    ////////////////
    // FUNCTIONAL //
    ////////////////

    // save state in local storage or file
    saveSquad(state: State, args: {toFile: boolean, path: string} = {toFile: false, path: ''}){

        var firstTeam: any[] = [];
        Object.values(state.firstTeam).forEach((pl: Player) => {
            firstTeam.push({
                name: pl.name,
                number: pl.number,
                positionX: pl.position.x,
                positionY: pl.position.y,
                positionKey: pl.positionKey,
                positionName: pl.positionName,
                positionShort: pl.positionShort,
                isGoalkeeper: pl.isGoalkeeper,
                isDummy: pl.isDummy
            })
        });
    
        var save: any = {
            version: '1.0.0',
    
            squadName: state.squadName,
            squadLogo: state.squadLogo,
            formationKey: state.formationKey,
            formationName: state.formationName,
            firstTeam,
            bench: [],
            reserves: [],

            settings: {
                playerStyle: state.settings.playerStyle,
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
    
        // TODO: load with committer instead of setting directly
        // TODO: save logo as string

        state.squadName = dec.squadName;
        state.squadLogo = dec.squadLogo;
        state.formationKey = dec.formationKey;
        state.formationName = dec.formationName;
    
        state.firstTeam = {};
        // load the players
        var player: Player;
        dec.firstTeam.forEach((pl:any)=>{
            player = new Player(new Vector2(pl.positionX, pl.positionY));
            player.name = pl.name;
            player.number = pl.number;
            player.positionKey = pl.positionKey;
            player.positionName = pl.positionName;
            player.positionShort = pl.positionShort;
            player.isGoalkeeper = pl.isGoalkeeper;
            player.isDummy = pl.isDummy;
    
            state.firstTeam[player.id] = player;
        })

        if(dec.settings === undefined) return;

        if(typeof dec.settings.playerStyle === 'number') Committer.setPlayerStyle(dec.settings.playerStyle);
        if(typeof dec.settings.circleRadius === 'number') state.settings.circleRadius = dec.settings.circleRadius;
        if(typeof dec.settings.circleStyle === 'number') Committer.setCircleStyle(dec.settings.circleStyle);

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

        // make sure to reset the undo redos
        Committer.resetUndoList();
        Committer.resetRedoList();
    },

    // reset everything back to default
    setDefault(state: State, args: {}){
        const ds = defaultState();

        state.version = ds.version;

        state.squadName = ds.squadName;
        state.squadLogo = ds.squadLogo;
        state.formationKey = ds.formationKey;
        state.formationName = ds.formationName;
    
        state.firstTeam = ds.firstTeam;
        state.bench = ds.bench;
        state.reserves = ds.reserves;
    
        state.settings = ds.settings;

        Committer.resetUndoList();
        Committer.resetRedoList();
        
    },

    // undo an action
    undo(state: State, args: {}){     

        if(state.undoList.length === 0) return;
        const u: UndoRedo | UndoRedo[] | undefined = state.undoList.pop();
        if(u === undefined) return;

        console.log("undoing:");
        console.log(u);        

        // SINGLE UNDO
        if(!Array.isArray(u)){
            var ref: any = u.ref;
            if(u.primitive !== null){
                // push current value into redo list
                const curVal = ref[u.primitive];
                state.redoList.push({
                    ref: ref,
                    primitive: u.primitive,
                    value: curVal
                })
                // finish undo
                ref[u.primitive] = u.value;
                return;
            }
            
            // push current value into redo list
            const curVal = ref;
            state.redoList.push({
                ref: ref,
                primitive: null,
                value: curVal
            })
            // finish undo
            ref = u.value;
            return;
        }

        // MULTI UNDO
        var ref: any;
        var redo: UndoRedo[] = [];
        for(var i = 0; i < u.length; i++){
            ref = u[i].ref;
            if(u[i].primitive !== null){
                // push current value into redo list
                const curVal = ref[u[i].primitive!];
                redo.push({
                    ref: ref,
                    primitive: u[i].primitive,
                    value: curVal
                })
                // finish undo
                ref[u[i].primitive!] = u[i].value;
            }
            else{
                // push current value into redo list
                const curVal = ref;
                redo.push({
                    ref: ref,
                    primitive: null,
                    value: curVal
                })
                // finish undo
                ref = u[i].value;
            }
        }

        // push redo array into redo list
        state.redoList.push(redo);
    },
    
    // redo an action
    redo(state: State, args: {}){
        
        if(state.redoList.length === 0) return;
        const u: UndoRedo | UndoRedo[] | undefined = state.redoList.pop();
        if(u === undefined) return;

        console.log("redoing");

        // SINGLE REDO
        if(!Array.isArray(u)){
            var ref: any = u.ref;
            if(u.primitive !== null){
                // push current value into redo list
                const curVal = ref[u.primitive];
                state.undoList.push({
                    ref: ref,
                    primitive: u.primitive,
                    value: curVal
                })
                // finish redo
                ref[u.primitive] = u.value;
                return;
            }
            
            // push current value into redo list
            const curVal = ref;
            state.undoList.push({
                ref: ref,
                primitive: null,
                value: curVal
            })
            // finish redo
            ref = u.value;
            return;
        }
        

        // MULTI REDO
        var ref: any;
        var undo: UndoRedo[] = [];
        for(var i = 0; i < u.length; i++){
            ref = u[i].ref;
            if(u[i].primitive !== null){
                // push current value into undo list
                const curVal = ref[u[i].primitive!];
                undo.push({
                    ref: ref,
                    primitive: u[i].primitive,
                    value: curVal
                })
                // finish undo
                ref[u[i].primitive!] = u[i].value;
            }
            else{
                // push current value into undo list
                const curVal = ref;
                undo.push({
                    ref: ref,
                    primitive: null,
                    value: curVal
                })
                // finish undo
                ref = u[i].value;
            }
        }

        // push undo array into undo list
        state.undoList.push(undo);
    },
    
    pushToUndoList(state: State, args: {ref: any, primitive: string | number | null, value: any}){
        
        console.log("pushing to undo list");
        
        state.undoList.push({
            ref: args.ref,
            primitive: args.primitive,
            value: args.value
        })

        Committer.resetRedoList();
    },

    pushMultipleToUndoList(state: State, args: {list: UndoRedo[]}){
        
        console.log("pushing multiple elements as single undo list instance");

        var undoList: UndoRedo[] = [];
        for(var i = 0; i < args.list.length; i++){
            undoList.push({
                ref: args.list[i].ref,
                primitive: args.list[i].primitive,
                value: args.list[i].value

            });
        }
        state.undoList.push(undoList);

        Committer.resetRedoList();
    },

    // call this to safely reset the undo list
    // clear all non-primitive data, or those, that point to non-primitive data from memory, if necessary
    resetUndoList(state: State, args: {}){
        
        function releaseMemory(ur: UndoRedo){
            // clear logo from memory, if possible
            // make sure we don't accidentally clear the current logo
            if(ur.ref === state && ur.primitive === 'squadLogo' && ur.value !== state.squadLogo)
                URL.revokeObjectURL(ur.value);
        }

        const ul = state.undoList;
        for(var i = 0; i < ul.length; i++){

            // single element
            const ul_el = ul[i];
            if(!Array.isArray(ul_el)){
                releaseMemory(ul_el);
                continue;
            }

            // multi element
            for(var j = 0; j < ul_el.length; j++){
                releaseMemory(ul_el[j]);
            }
        }

        state.undoList = [];
    },

    // call this to safely reset the redo list
    resetRedoList(state: State, args: {}){
        function releaseMemory(ur: UndoRedo){
            // clear logo from memory, if possible
            // make sure we don't accidentally clear the current logo
            if(ur.ref === state && ur.primitive === 'squadLogo' && ur.value !== state.squadLogo)
                URL.revokeObjectURL(ur.value);
        }

        const ul = state.redoList;
        for(var i = 0; i < ul.length; i++){
            // single element
            const ul_el = ul[i];
            if(!Array.isArray(ul_el)){
                releaseMemory(ul_el);
                continue;
            }

            // multi element
            for(var j = 0; j < ul_el.length; j++){
                releaseMemory(ul_el[j]);
            }
        }

        state.redoList = [];
    },

    //////////////////
    // NON-SETTINGS //
    //////////////////


    setSquadName(state: State, args: {squadName: string}){
        if(state.squadName === args.squadName) return;

        Committer.pushToUndoList(state, 'squadName', state.squadName);
        state.squadName = args.squadName;
    },

    // change formation based on given formation key
    changeFormation(state: State, args: {formationKey: string}){
        // NOTE: no checking, whether formationKeys are equivalent, since user could've switched a players position
        // -- instead check, if new positions of all players would be equal to their current ones
        const ft = state.firstTeam;
        const ft_keys = Object.keys(ft);
        const formation = FormationList[args.formationKey];
        const positions = formation.positions;
        if(positions.length !== 11) return;                 // must be 11 players!

        var undos: UndoRedo[] = [];
        var eq_count: number = 0;
        for(var i = 0; i < positions.length; i++){
            // count the number of players, whose positions haven't changed
            if( positions[i].position.x * state.settings.pitchSize.x) eq_count++;
        }

        // no need to 
        if(eq_count === 11) return;

        Committer.pushMultipleToUndoList(undos);

        // TODO: why is this even here?
        function assignPosition(player: Player, position: Position){
            player.position.x = position.position.x * state.settings.pitchSize.x;
            player.position.y = position.position.y * state.settings.pitchSize.y;
            player.positionName = position.name;
            player.positionShort = position.short;
        }

        
    },

    setFormationName(state: State, args: {name: string}){
        if(state.formationName === args.name) return;

        Committer.pushToUndoList(state, 'formationName', state.formationName);
        state.formationName = args.name;
    },

    // changes the squad logo based on the Blob taken from the value of an input element
    // passing 'null' resets the logo
    changeSquadLogo(state: State, args: {squadLogo: Blob | MediaSource | null}){
        // release old picture from memory
        URL.revokeObjectURL(state.squadLogo);
        if(args.squadLogo === null){
            state.squadLogo = '';
            return;
        }
        state.squadLogo = URL.createObjectURL(args.squadLogo);
    },

    // PLAYER

    // turn given dummy player into a real one with the given information
    replaceDummyWithPlayer(state: State, args: {player: Player, name: string, number: number, avatar: Blob | string | null}){
        // makes no sense replacing a dummy, that isn't one, oder?
        if(!args.player.isDummy) return;

        Committer.pushMultipleToUndoList([
            {ref: args.player, primitive: 'isDummy', value: args.player.isDummy},
            {ref: args.player, primitive: 'name', value: args.player.name},
            {ref: args.player, primitive: 'number', value: args.player.number},
            {ref: args.player, primitive: 'avatar', value: args.player.avatar},
        ]);
        
        args.player.isDummy = false;
        args.player.name = args.name;
        args.player.number = args.number;
        args.player.avatar = args.avatar;
    },

    // remove given player from first team and turn him into a dummy
    removePlayerFromFirstTeam(state: State, args: {player: Player}){
        if(args.player.isDummy) return;

        Committer.pushMultipleToUndoList([
            {ref: args.player, primitive: 'isDummy', value: args.player.isDummy},
            {ref: args.player, primitive: 'name', value: args.player.name},
            {ref: args.player, primitive: 'number', value: args.player.number},
            {ref: args.player, primitive: 'avatar', value: args.player.avatar},
        ]);
        
        args.player.isDummy = false;
        args.player.name = '';
        args.player.number = -1;
        args.player.avatar = null;
    },

    setPlayerName(state: State, args: {player: Player, name: string}){
        if(args.player.name === args.name) return;

        Committer.pushToUndoList(args.player, 'name', args.player.name);
        args.player.name = args.name;
    },

    setPlayerNumber(state: State, args: {player: Player, number: number}){
        if(args.player.number === args.number) return;

        Committer.pushToUndoList(args.player, 'number', args.player.number);
        args.player.number = args.number;
    },

    setPlayerAvatar(state: State, args: {player: Player, avatar: Blob | string | null}){
        if(args.player.avatar === args.avatar) return;

        Committer.pushToUndoList(args.player, 'avatar', args.player.avatar);
        args.player.avatar = args.avatar;
    },

    //////////////
    // SETTINGS //
    //////////////

    setPlayerStyle(state: State, args: {style: PlayerStyle}){
        if(args.style === state.settings.pitchStyle) return;        
        Committer.pushToUndoList(state.settings, 'playerStyle', state.settings.playerStyle);
        state.settings.playerStyle = args.style;
    },

    setCircleStyle(state: State, args: {style: number}){
        
        if(args.style < 0){
            if(state.settings.circleStyle === 0) return;
            
            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = 0;
            return;
        }

        const prev = state.settings.circleStyle;
        const styles = CircleStyles;
        console.log("styles: ", styles.length);
        
        if(styles.length === 0){
            if(state.settings.circleStyle === 0) return;

            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = 0;
            return;
        }

        if(args.style >= styles.length){
            if(state.settings.circleStyle === styles.length - 1) return;

            Committer.pushToUndoList(state.settings, 'circleStyle', state.settings.circleStyle);
            state.settings.circleStyle = styles.length - 1;
            return;
        }
        
        Committer.pushToUndoList(state.settings, 'circleStyle', prev);
        state.settings.circleStyle = args.style;
    },

    // VISUALS

    setShowNumbers(state: State, args: {showNumbers: boolean}){
        if(state.settings.showNumbers === args.showNumbers) return;

        Committer.pushToUndoList(state.settings, 'showNumbers', state.settings.showNumbers);
        state.settings.showNumbers = args.showNumbers;        
    },

    setShowNames(state: State, args: {showNames: boolean}){
        if(state.settings.showNames === args.showNames) return;

        Committer.pushToUndoList(state.settings, 'showNames', state.settings.showNames);
        state.settings.showNames = args.showNames;    

    },

    setShowLogo(state: State, args: {showLogo: boolean}){
        if(state.settings.showLogo === args.showLogo) return;

        Committer.pushToUndoList(state.settings, 'showLogo', state.settings.showLogo);
        state.settings.showLogo = args.showLogo;    

    },

    setShowSquadName(state: State, args: {showSquadName: boolean}){
        if(state.settings.showSquadName === args.showSquadName) return;

        Committer.pushToUndoList(state.settings, 'showSquadName', state.settings.showSquadName);
        state.settings.showSquadName = args.showSquadName;    

    },

    setShowFormation(state: State, args: {showFormation: boolean}){
        if(state.settings.showFormation === args.showFormation) return;

        Committer.pushToUndoList(state.settings, 'showFormation', state.settings.showFormation);
        state.settings.showFormation = args.showFormation;    

    },

    // set ONE team color with the given index
    setTeamColor(state: State, args: {index: number, color: string}){
        if(!Number.isInteger(args.index)) return;
        if(args.index < 0 || args.index >= state.settings.teamColors.length) return;
        if(state.settings.teamColors[args.index] === args.color) return;

        Committer.pushToUndoList(state.settings.teamColors, args.index, state.settings.teamColors[args.index])
        state.settings.teamColors[args.index] = args.color;
    },

    setLogoPosition(state: State, args: {logoPosition: Vector2}){
        if(state.settings.logoPosition.x === args.logoPosition.x
            && state.settings.logoPosition.y === args.logoPosition.y) return;

        Committer.pushToUndoList(state.settings, 'logoPosition', state.settings.logoPosition.copy());
        state.settings.logoPosition.x = args.logoPosition.x;
        state.settings.logoPosition.y = args.logoPosition.y;
    },

    // PITCH

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

            Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize.x);
            state.settings.pitchSize.x = 90;
            return;
        }
        if(args.width > 120){
            if(state.settings.pitchSize.x === 120) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize.x);
            state.settings.pitchSize.x = 120;
            return;
        }

        Committer.pushToUndoList(state.settings.pitchSize, 'x', state.settings.pitchSize.x);
        state.settings.pitchSize.x = Number(args.width);
    },

    setPitchHeight(state: State, args: {height: number}){
        if(args.height < 60){
            if(state.settings.pitchSize.y === 60) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize.y);
            state.settings.pitchSize.y = 60;
            return;
        }
        if(args.height > 90){
            if(state.settings.pitchSize.y === 90) return;

            Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize.y);
            state.settings.pitchSize.y = 90;
            return;
        }

        Committer.pushToUndoList(state.settings.pitchSize, 'y', state.settings.pitchSize.y);
        state.settings.pitchSize.y = Number(args.height);
        
    },

    setPitchOrientation(state: State, args: {orientation: string}){        
        if(args.orientation == state.settings.pitchOrientation ||
            ((args.orientation !== "horizontal") && (args.orientation !== "vertical"))) return;

        Committer.pushToUndoList(state.settings, "pitchOrientation", state.settings.pitchOrientation);
        state.settings.pitchOrientation = args.orientation;    
    },

    setPitchStyle(state: State, args: {style: number}){
        
        if(args.style < 0){
            if(state.settings.pitchStyle === 0) return;            
            Committer.pushToUndoList(state.settings, 'pitchStyle', state.settings.pitchStyle);
            state.settings.pitchStyle = 0;
            return;
        }
        
        const prev = state.settings.pitchStyle;
        
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
            return;
        }        

        Committer.pushToUndoList(state.settings, 'pitchStyle', prev);
        state.settings.pitchStyle = args.style;
        console.log(state.settings.pitchStyle);
        
    },

    // CANVAS

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
}

export const getters = {
    pitchSize(state: State): Vector2{
        return state.settings.pitchSize;
    },
    pitchOrientation(state: State): string{
        return state.settings.pitchOrientation;
    }
}

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    getters
}