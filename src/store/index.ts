import Pitch from '@/components/model/Pitch'
import Settings from '@/components/model/CanvasSettings'
import Team from '@/components/model/Team'
import { createStore } from 'vuex'
import editor, { mutations, State } from './modules/editor'
import Match from '@/components/model/Match'
import squad_creator from './modules/squad_creator'
import { domain } from '@/services/API'


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
    avatar_path: 'default.png'
    
  } as User,
  
  mutations: {
    login(state, args: UserData | null){
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

      if(args.avatar !== undefined && args.avatar !== null && args.avatar !== '') state.avatar_path = args.avatar;
      else state.avatar_path = 'default.png';
    },
    logout(state, args){
      // reset the storage to be sure
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');

      state.loggedIn = false;

      state.username = '';
      state.email = '';
      state.first_name = '';
      state.username = '';
      state.last_name = '';
      state.birthday = null;
      state.avatar_path = 'default.png';
    }
  },
  getters: {
    getAvatarURL: state => () =>{
      const url = domain + '/files/avatar/' + (state.avatar_path !== '' ? state.avatar_path : 'default.png');      
      return url;
    }
  },
  actions: {
  },
  modules: {
    editorStore: editor,
    squadCreatorStore: squad_creator
  }
})