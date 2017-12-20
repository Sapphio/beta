<script>
import Sidebar from './Sidebar'

/*
      {type: 'heading', label: 'User'},
      {
        label: 'Account',
        icon: 'fa-user',
        url: '/settings'
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
        label: 'Stream',
        icon: 'fa-list',
        url: '/settings/stream'
      },
      {type: 'heading', label: 'User'},
      {
        label: 'Account',
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
