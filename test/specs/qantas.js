import Qantas from "../pageobjects/qantas.page.js";
import { expect } from "chai";

async function setInputAndSubmit(selector, value) {
  await selector.click();
  await Qantas.input.waitForDisplayed({ timeout: 10000 });
  await Qantas.input.setValue(value);
  await browser.pause(1000);
  await browser.keys("Enter");
}

function formatTestId(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function selectDate(dateTestId) {
  const dateElement = await $(`[data-testid="${dateTestId}"]`);
  await dateElement.waitForClickable({ timeout: 10000 });
  await dateElement.click();
}

describe("Qantas Tests", () => {
  before(async () => {
    await Qantas.open();
  });

  // A. Develop tests for validation the Qantas logo and login button is displayed on (desktop/Tablet/mobile)
  it("1A. Validates the Qantas logo and login button is displayed on (desktop/Tablet/mobile)", async () => {
    const testSizes = [
      { width: 1024, height: 768, description: "desktop" },
      { width: 1024, height: 1366, description: "Tablet" },
      { width: 375, height: 667, description: "mobile" },
    ];

    for (let size of testSizes) {
      console.log(`Testing on ${size.description} size...`);
      await browser.setWindowSize(size.width, size.height);

      const logoIsDisplayed = await Qantas.logo.isDisplayed();
      expect(logoIsDisplayed, "Qantas logo is not displayed").to.be.true;

      const loginButtonIsDisplayed = await Qantas.loginButton.isDisplayed();
      expect(loginButtonIsDisplayed, "Login button is not displayed").to.be
        .true;

      const logoPosition = await Qantas.logo.getLocation();
      expect(logoPosition.x).to.be.above(
        0,
        `Logo X position is not as expected on ${size.description}`
      );
      expect(logoPosition.y).to.be.above(
        0,
        `Logo Y position is not as expected on ${size.description}`
      );

      const loginButtonPosition = await Qantas.loginButton.getLocation();
      expect(loginButtonPosition.x).to.be.above(
        0,
        `Login button X position is not as expected on ${size.description}`
      );
      expect(loginButtonPosition.y).to.be.above(
        0,
        `Login button Y position is not as expected on ${size.description}`
      );
    }
    await browser.setWindowSize(1024, 768);
  });

  // B. Develop test for Member login --- Negative
  it("1B. Tests for Member login --- Negative", async () => {
    Qantas.loginButton.click();
    await Qantas.login_form.waitForDisplayed({ timeout: 10000 });
    await Qantas.login_form_submit_btn.waitForDisplayed({ timeout: 10000 });

    Qantas.login_form_submit_btn.click();
    await browser.pause(1000);

    let isErrorMsgDisplayed = await Qantas.login_error_msg.isDisplayed();

    expect(
      isErrorMsgDisplayed,
      "Expected login error message to be displayed, but it wasn't."
    ).to.be.true;
  });

  // C. Develop tests for searching flights
  it("1C. Tests for searching flights", async () => {
    Qantas.search_container.click();
    await Qantas.search_btn.click();
    // set departure and arrival
    await setInputAndSubmit(Qantas.departure, "Sydney");
    await setInputAndSubmit(Qantas.arrival, "Melbourne");
    // set travelDates
    await Qantas.travelDates.click();
    await Qantas.travel_calendar.waitForDisplayed({ timeout: 10000 });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    await selectDate(formatTestId(tomorrow));
    await selectDate(formatTestId(dayAfterTomorrow));
    await Qantas.calendar_confirm_btn.click();

    await Qantas.submit_btn.waitForClickable({ timeout: 10000 });
    await Qantas.submit_btn.click();
  });
});
