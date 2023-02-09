export interface IObject{
    [key: string]: string
}

export enum SVG_SELECTION{ADD, EDIT, DELETE, DRAG, MOREV, MOREH, INFO, HELP, LOGIN, LOGOUT, IMPORT, EXPORT, SAVE, LOAD,
    SETTINGS, PROPERTIES, SEARCH, LIKE, LIKE_EMPTY, COPY, USER, EMAIL, PASSWORD, SEND, UNDO, REDO, CLOSE};

// TODO: for some reason, the enum with value 0 is not saved, when selecting the style
export enum PlayerStyle {NONE = 0, CIRCLE, JERSEY, FACE};

export enum PropertyType {DEFAULT = 0, PLAYER};

var _KeyPlayerStyleMap: {[key: string]: PlayerStyle} = {};
_KeyPlayerStyleMap[PlayerStyle[PlayerStyle.NONE]] = PlayerStyle.NONE;
_KeyPlayerStyleMap[PlayerStyle[PlayerStyle.CIRCLE]] = PlayerStyle.CIRCLE;
_KeyPlayerStyleMap[PlayerStyle[PlayerStyle.JERSEY]] = PlayerStyle.JERSEY;
_KeyPlayerStyleMap[PlayerStyle[PlayerStyle.FACE]] = PlayerStyle.FACE;

export const KeyPlayerStyleMap = _KeyPlayerStyleMap;