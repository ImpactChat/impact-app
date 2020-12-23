<template>
  <div class="chat">
    <slide-x-left-transition :duration="1000" :delay="0">
      <h1 v-show="show">This is a chat page</h1>
    </slide-x-left-transition>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Chat",
  data: () => ({
    show: false
  }),
  mounted() {
    this.show = true;
  }
});
</script>
