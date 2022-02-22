<template>
    <div class="content" v-if="track && track.album">
        <p class="is-128x128">
          <img :src="track.album.images[0].url"/>
        </p>
        <p>
            <strong>{{ track.name }}</strong>
            <small>[{{ track.duration_ms | ms-to-mm }}]</small>
        </p>
        <p>
            <audio controls="controls" :src="track.preview_url"></audio>
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['track'])
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 124px;
    border-radius: 50%;
  }
</style>
