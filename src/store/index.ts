import Pitch from '@/components/model/Pitch'
import Settings from '@/components/model/CanvasSettings'
import Team from '@/components/model/Team'
import { createStore } from 'vuex'
import editor, { mutations, State } from './modules/editor'
import Match from '@/components/model/Match'
import squad_creator from './modules/squad_creator'


interface User{
  loggedIn: false,

  username: string,
  email: string,
  first_name: string,
  last_name: string,
  birthday: Date,
  avatarPath: string
}


export default createStore({
  // only use default page-wide variables here (i.e. credentials of logged in user)
  state: {
    loggedIn: false,

    username: '',
    email: '',
    first_name: '',
    last_name: '',
    birthday: new Date(),
    avatarPath: ''
    
  } as User,
  
  mutations: {
    
  },
  actions: {
  },
  modules: {
    editorStore: editor,
    squadCreatorStore: squad_creator
  }
})