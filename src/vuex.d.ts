import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  export interface State{
    home: Team,
    away: Team,
    database: PlayerList,
    pitch: Pitch,
    entityList: EntityList
  }  

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}