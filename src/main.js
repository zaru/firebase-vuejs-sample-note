// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './firebase'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import store from './store'
import config from 'config'

Vue.config.productionTip = false

const configMixin = Vue.mixin({
  created: function () {
    this.$config = config
  }
})

Vue.use(VueFire)

/* eslint-disable no-new */
store.dispatch('init').then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    configMixin,
    components: { App },
    template: '<App/>'
  })
})
