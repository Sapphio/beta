<script>
import bus from '~/assets/js/bus'
import Sidebar from './Sidebar'

export default {
  extends: Sidebar,
  data() {
    const user = this.$store.state.user
    const menus = [
      {type: 'heading', label: 'Beta', hidden: !user},
      {
        label: 'Your Stream',
        icon: 'fa-home',
        url: '/',
        hidden: !user
      }, {
        label: 'Mentions',
        icon: 'fa-hand-o-right',
        url: '/mentions',
        hidden: !user
      }, {
        label: 'Interactions',
        icon: 'fa-exchange',
        url: '/interactions',
        hidden: !user
      }, {
        label: 'Stars',
        icon: 'fa-star',
        url: '/stars',
        hidden: !user
      },
      {type: 'heading', label: 'Explore'},
      {
        label: 'Global',
        url: '/global',
        icon: 'fa-globe'
      }, {
        label: 'Conversations',
        url: '/conversations',
        icon: 'fa-comments'
      }, {
        label: 'Most Starred',
        url: '/most-starred',
        icon: 'fa-star'
      }, {
        label: 'Photos',
        url: '/photos',
        icon: 'fa-camera'
      }, {
        label: 'Trending',
        url: '/trending',
        icon: 'fa-line-chart'
      },
      {type: 'heading', label: 'Other'},
      {
        label: 'About',
        url: '/about',
        icon: 'fa-info-circle'
      }, {
        label: 'Beta on Github',
        url: 'https://github.com/Sapphio/beta',
        normal: true,
        icon: 'fa-github'
      }, {
        label: 'Keyboard shortcuts',
        click: this.showHelpModal,
        normal: true,
        icon: 'fa-keyboard-o'
      }
    ]
    return {
      menus
    }
  },
  methods: {
    showHelpModal() {
      bus.$emit('showHelpModal')
    }
  }
}
</script>
