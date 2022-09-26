import { createStore } from 'vuex'

export default createStore({
  state: {
    isSubscribed: false,
  },
  mutations: {
    UPDATE_SUBSCRIBE(state, payload) {
      state.isSubscribed = payload
      localStorage.setItem('subscribe', true)
    }
  },
  actions: {
    setSubscription(context, payload) {
      // const favorites = context.state.favorites
      // favorites.push(payload)
      context.commit('UPDATE_SUBSCRIBE', payload)
    }
  },
  getters: {
    getSubscription: function (state) {
      return state.isSubscribed
    }
  }
})