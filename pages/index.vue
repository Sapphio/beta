<template>
  <div>
    <div v-if="user">
      <h3>Your Stream</h3>
      <div>
        <compose />
      </div>
      <div>
        <list :data="data" type="Post" ref="list" />
      </div>
    </div>
  </div>
</template>


<script>
import Compose from '~/components/Compose'
import List from '~/components/List'
import { mapState } from 'vuex'
import api from '~/plugins/api'
import bus from '~/assets/js/bus'

export default {
  components: {
    Compose,
    List
  },
  async asyncData(ctx) {
    if (ctx.store.state.user) {
      const data = await api(ctx).fetch()
      return { data }
    }
  },
  mounted() {
    bus.$on('post', this.add)
  },
  beforeDestroy() {
    bus.$off('post', this.add)
  },
  computed: mapState(['user']),
  methods: {
    add(post) {
      this.$refs.list.refresh()
    }
  },
  head: {
    title: 'Your Stream',
    meta: [
      {property: 'og:title', content: 'Beta, a Tavrn client'},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: 'https://beta.tavrn.gg'},// here it is just ngrok for my test
      {property: 'og:description', content: 'Beta, a Tavrn client'},
      {property: 'og:image', content: 'https://beta.tavrn.gg/_nuxt/img/beta.6b17b7d.png'},
      {property: 'twitter:image:src', content: 'https://beta.tavrn.gg/_nuxt/img/beta.6b17b7d.png'},
      {property: 'og:image:width', content: '256'},
      {property: 'og:site_name', content: 'Tavrn | Beta'}
    ]
  }
}
</script>
