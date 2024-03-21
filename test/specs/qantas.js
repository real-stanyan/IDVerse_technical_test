import Qantas from "../pageobjects/qantas.page.js";
import { expect } from "chai";

async function setInputAndSubmit(selector, value) {
  await selector.click();
  await Qantas.input.waitForDisplayed({ timeout: 10000 });
  await Qantas.input.setValue(value);
  await browser.pause(500);
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
  // A. Develop tests for validation the Qantas logo and login button is displayed
  it("1A. Tests for validation the Qantas logo and login button is displayed", async () => {
    expect(await Qantas.logo.isDisplayed()).to.be.true;
    expect(await Qantas.loginButton.isDisplayed()).to.be.true;
  });

  // B. Develop tests for searching flights
  it("1B. Tests for searching flights", async () => {
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
  // C. Develop assertions for flight search results
});
