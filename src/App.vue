<template>
  <div id="app">
    <pm-header></pm-header>
    <pm-notification v-show="showNotification">
      <p slot="body">No se encontraron resultados...</p>
    </pm-notification>

     <pm-loader v-show="isLoading"></pm-loader>
     <section class="section" v-show="!isLoading">
       <nav class="navbar">
         <div class="container">
           <input type="text" class="input is-large" placeholder="buscar canciones" v-model="searchQuery">
           <a class="button is-info is-large" @click="search">Buscar</a>
           <a class="button is-danger is-large">&times;</a>
         </div>
       </nav>
       <div class="container results">
         <div class="columns is-multiline">
           <div class="column is-one-quarter" v-for="(t, index) in tracks" :key="index">
             <pm-track 
              :class="{ 'is-active': t.id === selectedTrack }"
              :track="t" 
              @select="setSelectedTrack">
            </pm-track>
           </div>
         </div>
       </div>
       <div class="container" >
         <p class="small">Resultados encontrados: {{searchMessage}}</p>
       </div>
     </section>

     <pm-footer></pm-footer>
  </div>
</template>

<script>

import trackService from '@/services/track'
import PmFooter from '@/components/layout/Footer.vue'
import PmHeader from '@/components/layout/Header.vue'

import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'App',
  components : {
    PmFooter,
    PmHeader,
    PmTrack,
    PmLoader,
    PmNotification
  },
  data() {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      showNotification: false,
      selectedTrack: ''
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  },
  methods: {
    search() {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
      .then(res => {
        this.showNotification = res.tracks.total === 0
        this.tracks = res.tracks.items
        this.isLoading = false
      })
    },
    setSelectedTrack(id) {
      this.selectedTrack = id
    }
  },
  computed: {
    searchMessage() {
      return this.tracks.length
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  
  .results {
    margin-top: 50px;
  }
  .is-active {
    border: 3px #23d160 solid;
  }
</style>
