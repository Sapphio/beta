<template>
  <div>
    <h3 class="card-title">Stream</h3>
    <!-- custom-checkbox v-model="directed">
      Hide posts directed at people you do not follow
    </custom-checkbox -->
    <custom-checkbox v-model="unified">
      Unified timeline; include your mentions and personal stream together
    </custom-checkbox>
  </div>
</template>

<script>
import CustomCheckbox from '../CustomCheckbox'
export default {
  data() {
    return {
      unified: false,
      directed: false,
      error: null
    }
  },
  mounted() {
    this.unified = localStorage.getItem(`unified_timeline`) === 'true'
    this.directed = localStorage.getItem(`hide_directed_posts`) === 'true'
  },
  watch: {
    unified(newVal) {
      this.$store.commit('SET_UNIFIED', newVal)
      localStorage.setItem('unified_timeline', newVal)
    },
    directed(newVal) {
      this.$store.commit('SET_DIRECTED', newVal)
      localStorage.setItem('hide_directed_posts', newVal)
    }
  },
  methods: {

  },
  components: {
    CustomCheckbox
  }
}
</script>
