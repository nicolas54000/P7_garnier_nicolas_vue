import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../middleware/auth'
import VueRouteMiddleware from 'vue-route-middleware'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },

  {
    path: '/essai',
    name: 'essai',
    component: () => import('../views/essai.vue')
  },

  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    meta: {
      middleware: auth
    }
  },

  {
    path: '/postdetail',
    name: 'Postdetail',
    component: () => import('../views/Postdetail.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/ComAjout',
    name: 'ComAjout',
    component: () => import('../views/ComAjout.vue'),
    meta: {
      middleware: auth
    }
  },



  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router
