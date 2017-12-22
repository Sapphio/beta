<template>
  <div>
    <div class="card">
      <div class="card-body">
        <stream />
      </div>
    </div>
  </div>
</template>

<script>
import Stream from '~/components/settings/Stream'
export default {
  components: {
    Stream
  },
  head() {
    return {
      title: 'Stream settings'
    }
  }
}
</script>
