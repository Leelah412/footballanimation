// list of preset formations with information about position vectors and names

import Vector2 from "../math/Vector2"

export interface Position{
    position: Vector2
    name: string
    short: string
    isGoalkeeper?: boolean
}

export interface Formation{
    name: string
    positions: Position[]
}

export interface FormationList {
    [key: string]: Formation
}

// list of all positions one can put a player on, if position lock is active
// vector is relative to the center of the pitch normalized to a range of [-0.5, 0.5] for x and y
export const LockedPositions: {[key: string]: Position} = {
    GK: {
        name: 'Goalkeeper',
        short: 'GK',
        position: new Vector2(-0.4, 0),
        isGoalkeeper: true
    },
    
    LB: {
        name: 'Left-Back',
        short: 'LB',
        position: new Vector2(-0.3, -0.4),
    },
    LCB: {
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, -0.15),
    },
    CCB: {
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, 0.0),
    },
    RCB: {
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, 0.15),
    },
    RB: {
        name: 'Right-Back',
        short: 'RB',
        position: new Vector2(-0.3, 0.4),
    },

    LWB: {
        name: 'Left Wing-Back',
        short: 'LWB',
        position: new Vector2(-0.15, -0.4),
    },
    LDM: {
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, -0.15),
    },
    CDM: {
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, 0.0),
    },
    RDM: {
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, 0.15),
    },
    RWB: {
        name: 'Right Wing-Back',
        short: 'RWB',
        position: new Vector2(-0.15, 0.4),
    },

    LM: {
        name: 'Left Midfielder',
        short: 'LM',
        position: new Vector2(0.0, -0.4),
    },
    LCM: {
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, -0.15),
    },
    CCM: {
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, 0.0),
    },
    RCM: {
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, 0.15),
    },
    RM: {
        name: 'Right Midfielder',
        short: 'RM',
        position: new Vector2(0.0, 0.4),
    },

    LW: {
        name: 'Left Winger',
        short: 'LW',
        position: new Vector2(0.3, -0.4),
    },
    LOM: {
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, -0.15),
    },
    COM: {
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, 0.0),
    },
    ROM: {
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, 0.15),
    },
    RW: {
        name: 'Right Winger',
        short: 'RW',
        position: new Vector2(0.3, 0.4),
    },

    LS: {
        name: 'Striker',
        short: 'ST',
        position: new Vector2(0.45, -0.15),
    },
    ST: {
        name: 'Striker',
        short: 'ST',
        position: new Vector2(0.45, 0.0),
    },
    RS: {
        name: 'Striker',
        short: 'ST',
        position: new Vector2(0.45, 0.15),
    },
}

// NOTE: make sure each formation has EXACTLY 11 positions!
export default {
    '442': {
        name: '4-4-2',
        positions: [
            LockedPositions.GK,
            LockedPositions.LB,
            LockedPositions.LCB,
            LockedPositions.RCB,
            LockedPositions.RB,
            LockedPositions.LM,
            LockedPositions.LCM,
            LockedPositions.RCM,
            LockedPositions.RM,
            LockedPositions.LS,
            LockedPositions.RS,
        ]
    },
    '433': {
        name: '4-3-3',
        positions: [
            LockedPositions.GK,
            LockedPositions.LB,
            LockedPositions.LCB,
            LockedPositions.RCB,
            LockedPositions.RB,
            LockedPositions.CDM,
            LockedPositions.LCM,
            LockedPositions.RCM,
            LockedPositions.LW,
            LockedPositions.ST,
            LockedPositions.RW,
        ]
    },
    '4231': {
        name: '4-2-3-1',
        positions: [
            LockedPositions.GK,
            LockedPositions.LB,
            LockedPositions.LCB,
            LockedPositions.RCB,
            LockedPositions.RB,
            LockedPositions.LCM,
            LockedPositions.RCM,
            LockedPositions.COM,
            LockedPositions.LW,
            LockedPositions.ST,
            LockedPositions.RW,
        ]
    },
} as FormationList;