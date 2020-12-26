<template>
  <div class="codes">
    <slide-x-left-transition :duration="1000" :delay="0">
      <h1 v-show="show">This is a code page</h1>
    </slide-x-left-transition>
    <v-btn icon @click="fetchData">
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-container v-show="show1">
      <v-row>
        <v-col cols="12" lg="4" v-for="item in data" :key="item.pk">
          <v-card elevation="2" shaped :key="item.pk" class="card">
            <v-card-title>
              {{ item.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.prof }} · {{ item.classe_groupe }}
            </v-card-subtitle>
            <v-card-text>
              <h4>Début: {{ new Date(item.start).toLocaleString("fr") }}</h4>
              <h4>Fin: {{ new Date(item.end).toLocaleString("fr") }}</h4>
              <h4>Code: {{ item.code }}</h4>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                text
                :href="item.link"
                target="_blank"
                rel="noopener"
              >
                Rejoindre
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="780">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Proposer une classe
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Information
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-jsf v-model="model" :schema="schema" :options="options" />
            <v-btn type="submit" @click.prevent="addCode">
              Soumettre
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { codeService } from "../services/planning/codes.service";
import { Code } from "../entities";
import { form } from "../entities/codes";

export default Vue.extend({
  name: "Codes",
  data: () => ({
    valid: false,
    dialog: false,
    model: {} as Code,
    schema: form.schema,
    options: form.options,
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
    },
    async addCode() {
      if (this.valid) {
        this.dialog = false;
        await codeService.submitCodes(this.model);
        this.$store.dispatch(
          "alert/success",
          "Merci de la soumission, elle sera revue et approuvé bientôt",
          { root: true }
        );
        this.model = {} as Code;
      }
    }
  }
});
</script>
