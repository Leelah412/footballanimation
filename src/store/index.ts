import CanvasObject, { EntityList } from '@/components/model/CanvasObject'
import Pitch from '@/components/model/Pitch'
import Player, { PlayerList } from '@/components/model/Player'
import Team from '@/components/model/Team'
import Global, {EntityType} from '@/components/helper/Global'
import { createStore } from 'vuex'
import { mutations } from './modules/editor'

export default createStore({
  state: {
    home: new Team(),
    away: new Team(),
    database: {},         // database of all players available
    pitch: new Pitch(),
    entityList: {}

  },
  
  mutations: mutations,
  actions: {
  },
  modules: {
  }
})