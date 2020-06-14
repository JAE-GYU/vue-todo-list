import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Todo',
    component: () => import('@/views/TodoLayout')
  },  
]

const router = new VueRouter({
  routes
})

export default router
