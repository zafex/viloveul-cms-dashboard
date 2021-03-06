import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/modules/user/module'
import post from '@/modules/post/module'
import media from '@/modules/media/module'
import menu from '@/modules/menu/module'
import comment from '@/modules/comment/module'
import setting from '@/modules/setting/module'
import feature from '@/modules/feature/module'

Vue.use(Vuex)

const state = {
  redirect: process.env.BASE_URL,
  breadcrumbs: [],
  errors: [],
  status: 200
}

const mutations = {
  setBreadcrumbs: (context, items) => {
    context.breadcrumbs = [...items]
  },
  setErrors: (context, errors) => {
    for (let i = 0; i < errors.length; i++) {
      context.errors.push(errors[i])
    }
  },
  setTitle: (context, title) => {
    window.document.title = title
  },
  setRedirection: (context, path) => {
    context.redirect = path
  },
  setStatus: (context, code) => {
    context.status = parseInt(code)
  }
}

const getters = {
  getBreadcrumbs: (context) => () => {
    return context.breadcrumbs
  },
  getErrors: (context) => () => {
    return context.errors
  },
  getTitle: () => () => {
    return window.document.title
  },
  getRedirect: (context) => () => {
    return context.redirect
  },
  getStatus: (context) => () => {
    return parseInt(context.status)
  }
}

const actions = {
  resetErrors: (context) => {
    context.state.errors = []
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    user,
    media,
    post,
    menu,
    comment,
    setting,
    feature
  }
})

export default store
