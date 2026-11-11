import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/Common/HomeView.vue'
import Error404View from '@/views/Common/Error404View.vue'
import MasterMindView from '@/views/MasterMind/MasterMindView.vue'
import MasterMindAboutView from '@/views/MasterMind/MasterMindAboutView.vue'
import MasterMindSettingsView from '@/views/MasterMind/MasterMindSettingsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/master-mind',
      name: 'master-mind',
      component: MasterMindView,
      meta: { settings: true, about: true },
      children: [
        {
          path: 'settings',
          name: 'master-mind.settings',
          component: MasterMindSettingsView,
        },
        {
          path: 'about',
          name: 'master-mind.about',
          component: MasterMindAboutView,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/Common/AboutView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: '404', component: Error404View },
  ],
})

export default router
