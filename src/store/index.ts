import Pitch from '@/components/model/Pitch'
import Settings from '@/components/model/CanvasSettings'
import Team from '@/components/model/Team'
import { createStore } from 'vuex'
import { mutations, State } from './modules/editor'

export default createStore({
  state: {
    home: new Team(),
    away: new Team(),
    database: {},         // database of all players available
    pitch: new Pitch(),
    entityList: {},
    snapshotList: [],

    settings: new Settings(),
  } as State,
  
  mutations: mutations,
  actions: {
  },
  modules: {
  }
})