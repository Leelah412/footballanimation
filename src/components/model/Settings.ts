export interface TriColors{
    main: string
    secondary: string
    alternative?: string
}

export interface EntityColors{
    homeColors: TriColors
    awayColors: TriColors
    ballColors: TriColors
}

export const defaultEntityColors: EntityColors = {
    homeColors: {main: "#333", secondary: "#ccc"},
    awayColors: {main: "#ccc", secondary: "#333"},
    ballColors: {main: "#fff", secondary: "#000"}
}

export default class Settings{
    entityColors: EntityColors;

    constructor(entityColors: EntityColors = defaultEntityColors){
        this.entityColors = entityColors;
    }

    // the current settings as a static variable, such that we can zugreifen darauf from anywhere
    // sorry, but this is waaayyy more comfortable than passing down props through 54051 levels idc
    static settings: Settings = new Settings();
}

