<template>
  <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" lg="4"> </v-col>
        <v-col cols="12" lg="4">
          <v-card elevation="2" :loading="loggingIn">
            <v-card-title>
              Login
            </v-card-title>
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                label="Username"
                v-model="username"
                type="text"
                name="username"
                autocomplete="username"
                :rules="nameRules"
              />

              <v-text-field
                prepend-icon="lock"
                label="Password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                :rules="nameRules"
              />

              <v-btn :disabled="!valid" type="submit">
                Submit
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      valid: false,
      password: "",
      submitted: false,
      nameRules: [v => !!v || "This field is required"]
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.auth.loggingIn;
    }
  },
  created() {
    this.$store.dispatch("auth/logout");
  },
  methods: {
    handleSubmit() {
      console.log("[AUTH] Attempting log in");
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.$store.dispatch("auth/login", { username, password });
      }
    },

    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
