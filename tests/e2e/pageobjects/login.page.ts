class App {
  /**
   * elements
   */
  get heading() {
    return $("div.v-card__title");
  }
  get username() {
    return $("input[name='username']");
  }
  get password() {
    return $("input[name='password']");
  }
  get submit() {
    return $("button[type='submit']");
  }

  get browser() {
    return browser;
  }

  /**
   * methods
   */
  open(path = "/login") {
    browser.url(path);
  }
}

export default new App();
