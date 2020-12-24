import App from "../pageobjects/login.page";

describe("Login flow", () => {
  it("should open and render", () => {
    App.open();
    expect(App.heading).toHaveText("Login");
    expect(App.username).toBeExisting();
    expect(App.password).toBeExisting();
    expect(App.submit).toBeExisting();
  });
});
