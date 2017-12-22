<template>
  <div>
    <list :main="id" all :data="data" :option="option" type="Post" :key="`post-${id}`" :auto-refresh="false" />
  </div>
</template>

<script>
import Post from '~/components/Post'
import Compose from '~/components/Compose'
import List from '~/components/List'
import api from '~/plugins/api'
import bus from '~/assets/js/bus'

export default {
  async asyncData(ctx) {
    const { params: { id } } = ctx
    const _api = api(ctx)
    const option = {
      include_directed_posts: 1,
      include_starred_by: 1,
      include_reposters: 1
    }
    const postPromise = _api.fetch({
      include_directed_posts: 1,
      include_starred_by: 1,
      include_reposters: 1
    })

    const data = await postPromise
    data.data = data.data ? data.data.reverse() : []
    return {
      id, option, data
    }
  },
  // validate ({ params }) {
  //   return /^\d+$/.test(params.id)
  // },
  mounted() {
    bus.$on('post', this.addAfter)
  },
  beforeDestroy() {
    bus.$off('post', this.addAfter)
  },
  components: {
    Post, Compose, List
  },
  methods: {
    addAfter(post) {
      // TODO: push post to list if post target is this page's post
      // this.data.data.push(post)
    }
  },
  head() {
    //console.log("data", this.data.data)
    const [post] = this.data.data
      .filter(post => post.id === this.id)
    var name = "unknown"
    var title = ""
    var meta = []
    if (post) {
      title = post.text
      if (title.length > 30) {
        title = title.substr(0, 30) + '…'
      }
      name = post.user.name
        ? `${post.user.name}(@${post.user.username})`
        : `@${post.user.username}`

      meta.push({property: 'og:site_name', content: 'Tavrn | Beta | Post'})
      meta.push({property: 'og:title', content: title})
      meta.push({property: 'og:description', content: post.text})
      meta.push({property: 'og:type', content: 'article'})
      meta.push({property: 'og:url', content: 'http://beta.tavrn.gg/@'+post.user.username+'/'+post.id})
      meta.push({property: 'og:type', content: 'article'})

      if (post.annotations) {
        const embedPhotos = post.annotations.filter(r => {
          return (r.type === 'io.pnut.core.oembed' ||
            r.type === 'net.app.core.oembed' ||
            r.type === 'gg.tavrn.core.oembed') &&
            r.value.type === 'photo'
        }).map(r => {
          return {
            original: r.value.url,
            thumb: r.value.url
          }
        })
        if (embedPhotos.length) {
          var image_url = embedPhotos[0].thumb
          meta.push({property: 'og:image', content: image_url})
          //{property: 'og:image:width', content: '1000'},
          meta.push({property: 'twitter:image:src', content: image_url})
        }
      }
    }
    title = `${name}: ${title}`
    return {
      title: title,
      meta: meta
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/css/mixin';


.post {
  @include no-gutter-xs
}
</style>
