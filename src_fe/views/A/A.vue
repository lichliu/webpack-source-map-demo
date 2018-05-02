<template>
  <div class="A">
      this is component A, I use C
      <C></C>
  </div>
</template>
<script>
import C from '../../components/C';
export default {
  data() {
      return {};
  },
  components: {
      C
  }
}
</script>
<style lang="less">
.A {
    color: green;
}
</style>


