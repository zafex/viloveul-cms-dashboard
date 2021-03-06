// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NProgress from 'nprogress'
import store from '@/store'
import router from '@/router'
import http from '@/common/http'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueGoodTablePlugin from 'vue-good-table'
import Croppa from 'vue-croppa'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'nprogress/nprogress.css'
import '@/assets/alert.css'

Vue.config.productionTip = false

Vue.use(CKEditor)
Vue.use(VueGoodTablePlugin)
Vue.use(Croppa)

NProgress.configure({
  trickle: false
})

http.interceptors.request.use(config => {
  NProgress.start()
  return config
})

http.interceptors.response.use(
  res => {
    store.commit('setStatus', res.status)
    NProgress.done()
    return res
  },
  err => {
    store.dispatch('resetErrors')
    if (err.response === undefined) {
      store.commit('setStatus', 500)
      store.commit('setErrors', [
        'Oops network problem.'
      ])
    } else if (err.response.status !== 404) {
      let errors = err.response.data.errors.map(e => {
        return e.detail
      })
      store.commit('setStatus', err.response.status)
      store.commit('setErrors', errors)
    }
    NProgress.done()
    return Promise.reject(err)
  }
)

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    if (to.path !== '/login') {
      store.dispatch('resetErrors')
    }
    store.commit('setBreadcrumbs', [])
    store.commit('setTitle', 'Viloveul')
  }
  store.commit('setRedirection', from.path)
  return next()
})

router.beforeResolve((to, from, next) => {
  NProgress.start()
  return next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  store,
  router,
  template: '<transition name="slide"><router-view></router-view></transition>'
}).$mount('#viloveul')
