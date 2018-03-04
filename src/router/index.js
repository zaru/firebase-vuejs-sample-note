import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'

import HelloWorld from '@/components/HelloWorld'
import UserSession from '@/components/UserSession'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign_in',
      component: UserSession
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        next({
          path: '/sign_in'
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
