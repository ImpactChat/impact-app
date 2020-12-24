class App {
  /**
   * elements
   */
  get heading() {
    return $("div.v-card__title");
  }

  /**
   * methods
   */
  open(path = "/") {
    browser.url(path);
  }
}

export default new App();
