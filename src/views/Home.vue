<template>
  <div class="home">
    <slide-x-left-transition :duration="1000" :delay="0">
      <img v-show="show" alt="Vue logo" src="../assets/logo.png" />
    </slide-x-left-transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data: () => ({
    show: false
  }),
  mounted() {
    this.show = true;
  }
});
</script>
