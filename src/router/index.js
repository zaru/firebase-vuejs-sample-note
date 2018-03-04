import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'

import Note from '@/components/Note'
import UserSession from '@/components/UserSession'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Note,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/note/:noteId',
      name: 'Note',
      component: Note,
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
