<template>
  <div class="about">
    <h1>This is a notes page</h1>
    <div id="editor">
      <slide-x-left-transition :duration="1000" :delay="0">
        <textarea v-show="show" :value="input" @input="update"></textarea>
      </slide-x-left-transition>
      <slide-x-left-transition :duration="1000" :delay="200">
        <div v-show="show2" v-html="compiledMarkdown"></div>
      </slide-x-left-transition>
    </div>
  </div>
</template>
<style>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  margin-right: 10px;
  height: 750px;
}
#editor div {
  background-color: #ddd;
}

code {
  color: #f66;
}

blockquote {
  margin-left: 20px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { SlideXLeftTransition } from "vue2-transitions";

import marked from "marked";
import _ from "lodash";
export default Vue.extend({
  data: () => ({
    input: "# hello",
    show: false,
    show2: false
  }),
  computed: {
    compiledMarkdown: function() {
      return marked(this.input); // TODO: Sanitize!!
    }
  },
  methods: {
    // eslint-disable-next-line
    update: _.debounce(function(this: any, e) {
      this.input = e.target.value;
    }, 300)
  },
  components: {
    SlideXLeftTransition
  },
  mounted() {
    this.show = true; // might need this.$nextTick
    this.show2 = true; // might need this.$nextTick
  }
});
</script>
