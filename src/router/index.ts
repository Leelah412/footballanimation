import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Editor from '@/views/Editor.vue';
import SquadCreator from '@/views/SquadCreator.vue';
import UserProfile from '@/views/UserProfile.vue';
import SquadPage from '@/views/SquadPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/user/:username',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/squad-creator',
    name: 'squadCreator',
    component: SquadCreator
  },
  {
    path: '/squad',
    name: 'squadPage',
    component: SquadPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
