import Pitch from '@/components/model/Pitch'
import Settings from '@/components/model/CanvasSettings'
import Team from '@/components/model/Team'
import { createStore } from 'vuex'
import editor, { mutations, State } from './modules/editor'
import Match from '@/components/model/Match'
import squad_creator from './modules/squad_creator'


interface User{
  loggedIn: boolean,

  username: string,
  email: string,
  first_name: string,
  last_name: string,
  birthday: Date | null,
  avatar_path: string
}

interface UserData{
  username: string,
  email?: string,
  first_name?: string,
  last_name?: string,
  birthday?: Date,
  avatar?: string
}

export default createStore({
  // only use default page-wide variables here (i.e. credentials of logged in user)
  state: {
    loggedIn: false,

    username: '',
    email: '',
    first_name: '',
    last_name: '',
    birthday: null,
    avatar_path: ''
    
  } as User,
  
  mutations: {
    loginUser(state, args: UserData | null){
      if(args === null) return;

      state.loggedIn = true;
      state.username = args.username;
      
      if(args.email !== undefined) state.email = args.email;
      else state.email = '';

      if(args.first_name !== undefined) state.first_name = args.first_name;
      else state.first_name = '';

      if(args.last_name !== undefined) state.last_name = args.last_name;
      else state.last_name = '';

      if(args.birthday !== undefined) state.birthday = args.birthday;
      else state.birthday = null;

      if(args.avatar !== undefined) state.avatar_path = args.avatar;
      else state.avatar_path = '';
    }
  },
  actions: {
  },
  modules: {
    editorStore: editor,
    squadCreatorStore: squad_creator
  }
})