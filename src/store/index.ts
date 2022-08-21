import Pitch from '@/components/model/Pitch'
import Settings from '@/components/model/CanvasSettings'
import Team from '@/components/model/Team'
import { createStore } from 'vuex'
import editor, { mutations, State } from './modules/editor'
import Match from '@/components/model/Match'
import squad_creator from './modules/squad_creator'



export default createStore({
  // only use default page-wide variables here
  state: {
    
  },
  
  mutations: {
    
  },
  actions: {
  },
  modules: {
    editorStore: editor,
    squadCreatorStore: squad_creator
  }
})