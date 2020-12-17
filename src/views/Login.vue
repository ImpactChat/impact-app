<template>
  <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
    <h1>Login</h1>
    <v-text-field
      prepend-icon="person"
      label="Username"
      v-model="username"
      type="text"
      name="username"
      class="input"
      :rules="nameRules"
    />

    <v-text-field
      prepend-icon="lock"
      label="Password"
      v-model="password"
      type="password"
      name="password"
      class="input"
      :rules="nameRules"
    />
    <br />
    <v-btn
      :disabled="!valid"
      class="mr-4"
      @click="handleSubmit()"
      type="submit"
    >
      Submit
    </v-btn>
    <v-progress-circular
      v-show="loggingIn"
      indeterminate
      color="primary"
    ></v-progress-circular>
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
