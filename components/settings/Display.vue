<template>
  <div>
    <h3 class="card-title">Display</h3>
    <custom-checkbox v-model="square">
      Square avatars
    </custom-checkbox>
    <custom-checkbox v-model="theme">
      Dark theme (You may need to reload for this to take effect)
    </custom-checkbox>
  </div>
</template>

<script>
import CustomCheckbox from '../CustomCheckbox'
export default {
  data() {
    return {
      square: false,
      theme: false,
      error: null
    }
  },
  mounted() {
    this.square = localStorage.getItem(`square_avatars`) === 'true'
    this.theme = localStorage.getItem(`dark_theme`) === 'true'
    //console.log('display setting mount', this.square, this.theme)
  },
  watch: {
    square(newVal) {
      //this.$store.commit('SET_SQUARE', newVal)
      localStorage.setItem('square_avatars', newVal)
    },
    theme(newVal) {
      //this.$store.commit('SET_THEME', newVal)
      localStorage.setItem('dark_theme', newVal)
    }
  },
  methods: {

  },
  components: {
    CustomCheckbox
  }
}
</script>
