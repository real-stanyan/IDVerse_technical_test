import Qantas from "../pageobjects/qantas.page.js";
import { expect } from "chai";

describe("Qantas Tests", () => {
  before(async () => {
    await Qantas.open();
  });
  // A. Develop tests for validation the Qantas logo and login button is displayed
  it("1A. Develop tests for validation the Qantas logo and login button is displayed", async () => {
    expect(await Qantas.logo.isDisplayed()).to.be.true;
    expect(await Qantas.loginButton.isDisplayed()).to.be.true;
  });
});
