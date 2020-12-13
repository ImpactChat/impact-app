<template>
  <div class="about">
    <slide-x-left-transition :duration="1000" :delay="0">
      <h1 v-show="show3">This is a notes page</h1>
    </slide-x-left-transition>
    <div id="editor">
      <slide-y-down-transition :duration="1000" :delay="0">
        <textarea v-show="show" :value="input" @input="update"></textarea>
      </slide-y-down-transition>
      <slide-y-down-transition :duration="1000" :delay="200">
        <MDOutput v-show="show2" v-bind:compiled="compiledMarkdown"></MDOutput>
      </slide-y-down-transition>
    </div>
  </div>
</template>
<style>
#editor {
  margin: 0;
  height: 100%;
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
  height: 750px;
}
</style>

<script lang="ts">
import Vue from "vue";
import DOMPurify from "dompurify";

import marked from "marked";
import _ from "lodash";
import MDOutput from "../components/MarkdownOutput.vue";
export default Vue.extend({
  data: () => ({
    input: "# Hello, World!",
    show: false,
    show2: false,
    show3: false,
    compiled: ""
  }),
  computed: {
    compiledMarkdown: function() {
      const rendered = marked(this.input);
      const sanitized = DOMPurify.sanitize(rendered);
      console.log("Sanitized");
      return sanitized;
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: _.debounce(function(this: any, e) {
      this.input = e.target.value;
    }, 300)
  },
  components: {
    MDOutput
  },
  mounted() {
    this.show = true; // might need this.$nextTick
    this.show2 = true; // might need this.$nextTick
    this.show3 = true; // might need this.$nextTick
  }
});
</script>
