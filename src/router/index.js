import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'

import Note from '@/components/Note'
import NotePublic from '@/components/NotePublic'
import SignUp from '@/components/SignUp'
import UserSession from '@/components/UserSession'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '/@note/:noteId',
      name: 'NotePublic',
      component: NotePublic
    },
    {
      path: '/sign_up',
      component: SignUp
    },
    {
      path: '/sign_in',
      component: UserSession
    },
    {
      path: '/not_found',
      component: NotFound
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
