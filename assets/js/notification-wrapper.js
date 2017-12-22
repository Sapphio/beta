import { getTitle } from './util'

function isEnabledNotification() {
  return localStorage.getItem('notification') === 'true'
}

export function sendPostNotification(posts) {
  const enabled = localStorage.getItem('notification:posts') === 'true'
  if (!enabled || !isEnabledNotification()) return
  if (posts.length === 1) {
    const [post] = posts
    const { text: body } = post
    const { avatar_image: { url: icon } } = post.user
    const title = getTitle(post.user)
    const options = {
      icon,
      body
    }
    return new Notification(title, options)
  } else {
    const count = posts.length
    const title = `Receive ${count} posts.`
    const options = {
      icon: '/img/beta.png'
    }
    return new Notification(title, options)
  }
}

export function sendMentionNotification(mentions) {
  const enabled = localStorage.getItem('notification:mentions') === 'true'
  if (!enabled || !isEnabledNotification()) return
  return mentions.map(mention => {
    const { text: body } = mention
    const {
      avatar_image: {
        url: icon
      }
    } = mention.user
    const title = getTitle(mention.user)
    const options = {
      icon,
      body
    }
    return new Notification(title, options)
  })
}

export function sendInteractionNotification(interactions) {
  const enabled = localStorage.getItem('notification:interactions') === 'true'
  if (!enabled || !isEnabledNotification()) return
  var title = ''
  var options = {}
  if (interactions.length === 1) {
    const [interaction] = interactions
    //console.log('interaction', interaction);
    const { action: body } = interaction
    const {
      avatar_image: {
        url: icon
      }
    } = interaction.users[0]
    title = getTitle(interaction.users[0])
    options = {
      icon,
      body,
      data: {
        interaction: interaction
      }
    }
  } else {
    const count = interactions.length
    title = `Receive ${count} interactions.`
    options = {
      icon: '/img/beta.png'
    }
  }
  var note = new Notification(title, options)
  note.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    note.close();
    // If the window is minimized, restore the size of the window
    window.open().close();
    // focus
    window.focus();
    //console.log('interaction event', event)
    //window.open("https://beta.tavrn.gg/interactions");
    window.location="https://beta.tavrn.gg/interactions";
  }
  return note;
}
