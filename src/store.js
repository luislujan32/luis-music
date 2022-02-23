import Vue from 'vue'
import Vuex from 'vuex'

import trackService from '@/services/track'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        track: {}
    },
    getters: {
        trackTitle (state) {
            return  (!state.track.name) ? '' : `${state.track.name} - ${state.track.artists[0].name}`
        }
    },
    // No se maneja codido asincronico
    mutations: {
        setTrack (state, track) {
            state.track = track
        }
    },
    // Se maneja codigo asincronico
    actions: {
        getTrackById (context, payload) {
          return trackService.getById(payload.id)
            .then(res => {
              // Se hace commit a la mutation setTrack
              context.commit('setTrack', res)
              return res
            })
        }
      }
})

export default store