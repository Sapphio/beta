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
    /*
    meta: [
      {property: 'og:title', content: 'title'},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: 'http://c5e3b0ec.ngrok.io/blog/s'},// here it is just ngrok for my test
      {property: 'og:description', content: 'description'},
      {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/dev-blog-2503f.appspot.com/o/postsStorage%2F-KxXdvvLqDHBcxdUfLgn%2Fonfleck?alt=media&token=24a9bf5b-dce2-46e8-b175-fb63f7501c98'},
      {property: 'twitter:image:src', content: 'https://firebasestorage.googleapis.com/v0/b/dev-blog-2503f.appspot.com/o/postsStorage%2F-KxXdvvLqDHBcxdUfLgn%2Fonfleck?alt=media&token=24a9bf5b-dce2-46e8-b175-fb63f7501c98'},
      {property: 'og:image:width', content: '1000'},
      {property: 'og:site_name', content: '41devs | blog'}
    ]
    */
  }
}
</script>
