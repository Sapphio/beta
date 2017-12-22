import Vue from 'vue'
import Vuex from 'vuex'
import api from '~/plugins/api'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    user: null,
    hide_directed_posts: false,
    square_avatars: false,
    unified_timeline: false,
    dark_theme: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_DIRECTED(state, value) {
      console.log('SET_DIRECTED', value)
      state.hide_directed_posts = value
    },
    SET_SQUARE(state, value) {
      state.square_avatars = value
    },
    SET_UNIFIED(state, value) {
      state.unified_timeline = value
    },
    SET_THEME(state, value) {
      state.dark_theme = value
    }
  },
  actions: {
    async nuxtServerInit({ commit }, ctx) {
      const { req } = ctx
      if (req.user) {
        const res = await api(ctx).request('/token').catch(() => ({data: {}}))
        if (res.meta.code == 401) {
          // token is no longer valid
          return
        }
        const { data: { storage } } = await api(ctx).request('/token').catch(() => ({data: {}}))
        const user = Object.assign({}, req.user, {
          storage
        })
        delete user.token
        commit('SET_USER', user)
      }
    }
  }
})

export default store
