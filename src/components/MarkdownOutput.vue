<template>
  <div>
    <div id="output" v-html="this.compiled"></div>
  </div>
</template>
<style>
#output blockquote {
  margin-left: 20px;
}
#output code {
  color: #f66;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["compiled"],
  data: function() {
    return { output: this.compiled };
  },
  components: {}
});
</script>
