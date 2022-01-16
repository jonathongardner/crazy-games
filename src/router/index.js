import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Common/Home.vue'
import MasterMind from '../views/MasterMind/MasterMind.vue'
import MasterMindSettings from '../views/MasterMind/MasterMindSettings.vue'
import MasterMindAbout from '../views/MasterMind/MasterMindAbout.vue'
import Error404 from '../views/Common/Error404.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/master-mind',
    name: 'master-mind',
    component: MasterMind,
    meta: {
      reload: true,
      settings: true,
      about: true
    },
    children: [
      {
        path: 'settings',
        name: 'master-mind.settings',
        component: MasterMindSettings
      },
      {
        path: 'about',
        name: 'master-mind.about',
        component: MasterMindAbout
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Common/About.vue')
  },
  {
    path: '/:catchAll(.*)',
    name:'404',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
