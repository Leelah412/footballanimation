import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Editor from '@/views/Editor.vue';
import SquadCreator from '@/views/SquadCreator.vue';
import UserProfile from '@/views/UserProfile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    path: '/user',
    name: 'userProfile',
    component: UserProfile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
