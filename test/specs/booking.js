import { expect } from "chai";

describe("Booking API Tests", function () {
  const apiUrl = "https://restful-booker.herokuapp.com";
  let bookingID = 0;
  let token = 0;

  // create token
  async function createAuthToken() {
    const response = await fetch("https://restful-booker.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "password123",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create auth token: ${response.statusText}`);
    }

    const data = await response.json();
    token = data.token;
  }
  createAuthToken();

  //   A. CreateBooking Test --- Positive
  it("CreateBooking Test --- Positive", async function () {
    const bookingData = {
      firstname: "Stan",
      lastname: "yan",
      totalprice: 123,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02",
      },
      additionalneeds: "lunch",
    };

    const response = await fetch(`${apiUrl}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    bookingID = data.bookingid;
    expect(response.status).to.equal(200);
    expect(data.booking).to.deep.include(bookingData);
  });

  //   A. CreateBooking Test --- Negative
  it("CreateBooking Test --- Negative", async function () {
    const invalidBookingData = {
      firstname: 123,
      lastname: 123,
      totalprice: "111",
      depositpaid: "111",
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-2",
      },
      additionalneeds: "lunch",
    };

    const response = await fetch(`${apiUrl}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidBookingData),
    });

    expect(response.status).to.not.equal(200);
  });
});
