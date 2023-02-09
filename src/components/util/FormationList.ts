import Vector2 from "@/components/math/Vector2"

// list of preset formations with information about position vectors and names

export interface Position{
    id: string
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
        id: 'GK',
        name: 'Goalkeeper',
        short: 'GK',
        position: new Vector2(-0.4, 0),
        isGoalkeeper: true
    },
    
    LB: {
        id: 'LB',
        name: 'Left-Back',
        short: 'LB',
        position: new Vector2(-0.3, -0.4),
    },
    LCB: {
        id: 'LCB',
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, -0.15),
    },
    CCB: {
        id: 'CCB',
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, 0.0),
    },
    RCB: {
        id: 'RCB',
        name: 'Center-Back',
        short: 'CB',
        position: new Vector2(-0.3, 0.15),
    },
    RB: {
        id: 'RB',
        name: 'Right-Back',
        short: 'RB',
        position: new Vector2(-0.3, 0.4),
    },

    LWB: {
        id: 'LWB',
        name: 'Left Wing-Back',
        short: 'LWB',
        position: new Vector2(-0.15, -0.4),
    },
    LDM: {
        id: 'LDM',
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, -0.15),
    },
    CDM: {
        id: 'CDM',
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, 0.0),
    },
    RDM: {
        id: 'RDM',
        name: 'Defensive Midfielder',
        short: 'DM',
        position: new Vector2(-0.15, 0.15),
    },
    RWB: {
        id: 'RWB',
        name: 'Right Wing-Back',
        short: 'RWB',
        position: new Vector2(-0.15, 0.4),
    },

    LM: {
        id: 'LM',
        name: 'Left Midfielder',
        short: 'LM',
        position: new Vector2(0.0, -0.4),
    },
    LCM: {
        id: 'LCM',
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, -0.15),
    },
    CCM: {
        id: 'CCM',
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, 0.0),
    },
    RCM: {
        id: 'RCM',
        name: 'Central Midfielder',
        short: 'CM',
        position: new Vector2(0.0, 0.15),
    },
    RM: {
        id: 'RM',
        name: 'Right Midfielder',
        short: 'RM',
        position: new Vector2(0.0, 0.4),
    },

    LW: {
        id: 'LW',
        name: 'Left Winger',
        short: 'LW',
        position: new Vector2(0.3, -0.4),
    },
    LOM: {
        id: 'LOM',
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, -0.15),
    },
    COM: {
        id: 'COM',
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, 0.0),
    },
    ROM: {
        id: 'ROM',
        name: 'Offensive Midfielder',
        short: 'OM',
        position: new Vector2(0.2, 0.15),
    },
    RW: {
        id: 'RW',
        name: 'Right Winger',
        short: 'RW',
        position: new Vector2(0.3, 0.4),
    },

    LS: {
        id: 'LS',
        name: 'Striker',
        short: 'ST',
        position: new Vector2(0.45, -0.15),
    },
    ST: {
        id: 'ST',
        name: 'Striker',
        short: 'ST',
        position: new Vector2(0.45, 0.0),
    },
    RS: {
        id: 'RS',
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