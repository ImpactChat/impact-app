<template>
  <div class="codes">
    <slide-x-left-transition :duration="1000" :delay="0">
      <h1 v-show="show">This is a code page</h1>
    </slide-x-left-transition>
    <slide-y-down-transition :duration="1000" :delay="0">
      <v-container v-show="show1">
        <v-row>
          <v-col cols="12" lg="4" v-for="item in data" :key="item.pk">
            <v-card elevation="2" shaped>
              <v-card-title>
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.prof }} · {{ item.classe_groupe }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" text>
                  Join
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </slide-y-down-transition>
    <v-btn @click="fetchData">
      Refresh
    </v-btn>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { codeService } from "../services/planning/codes.service";
import { Code } from "../entities";

export default Vue.extend({
  name: "Codes",
  data: () => ({
    show: false,
    show1: false,
    data: [] as Array<Code>
  }),
  mounted() {
    this.show = true;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const data = await codeService.getCodes();
      this.data = data;
      this.show1 = true;
    }
  }
});
</script>
