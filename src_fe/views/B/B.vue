<template>
  <div class="B">
      this is component B, I also use C.
      <C></C>
  </div>
</template>
<script>
import C from '../../components/C'
export default {
  data () {
      return {}
  },
  components: {
      C
  }
}
</script>
<style lang="less">
.B {
    color: blue;
}
</style>


