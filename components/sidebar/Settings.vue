<script>
import Sidebar from './Sidebar'

/*
      {type: 'heading', label: 'User'},
      {
        label: 'Account',
        icon: 'fa-user',
        url: '/settings'
      },
      {
        label: 'Imgur',
        icon: 'fa-picture-o',
        url: '/settings/imgur'
      },
*/

export default {
  extends: Sidebar,
  data() {
    const menus = [
      {type: 'heading', label: 'App'},
      {
        label: 'Notification',
        icon: 'fa-bell',
        url: '/settings/notification'
      },
      {
        label: 'Display',
        icon: 'fa-paint-brush',
        url: '/settings/display'
      },
      {
        label: 'Stream',
        icon: 'fa-list',
        url: '/settings/stream'
      },
      {type: 'heading', label: 'Account'},
      {
        label: 'Profile',
        icon: 'fa-user',
        normal: true,
        url: 'https://accounts.sapphire.moe/app/users/my'
      },
    ]
    return {
      menus
    }
  }
}
</script>
