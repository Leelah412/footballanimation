export interface PropertyMenuListItem{
    id: string                  // id MUST be the same as the key name
    header: string
    avatar: string
    tooltip?: string
};

export default {
    settings: {
        id: 'settings',
        header: 'Attributes',
        avatar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"var(--light)\"> \
                    <path d=\"M0 0h24v24H0z\" fill=\"none\"/> \
                    <path d=\"M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z\"/> \
                </svg>",
        tooltip: "Basic settings for the canvas, pitch and player objects."
    },
    teamSettings: {
        id: 'teamSettings',
        header: 'Teams',
        avatar: '',
        tooltip: 'Edit the team attributes for both the home and the away team.'
    },
    playerList: {
        id: 'playerList',
        header: 'Player List',
        avatar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"var(--light)\">\
                    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\
                    <path d=\"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z\"/>\
                </svg>",
        tooltip: "Edit the (list of) players on and off the field."
    }
}