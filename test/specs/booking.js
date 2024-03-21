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
  it("2A. CreateBooking Test --- Positive", async function () {
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
  it("2A. CreateBooking Test --- Negative", async function () {
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

  //   B. UpdateBooking Test --- Positive
  it("2B. Update Booking - Positive", async function () {
    const updateData = {
      firstname: "wenyao",
      lastname: "yan",
      totalprice: 321,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-02-01",
        checkout: "2024-02-02",
      },
      additionalneeds: "lunch",
    };

    const response = await fetch(`${apiUrl}/booking/${bookingID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(updateData),
    });

    expect(response.status).to.equal(200);
    if (response.status === 200) {
      const data = await response.json();
      expect(data).to.deep.include(updateData);
    }
  });

  //   B. UpdateBooking Test --- Negative
  it("2B. Update Booking - Negative", async function () {
    const invalidBookingId = "nonexistent_booking_id";
    const invalidToken = "invalid_auth_token";
    const updateData = {};

    const response = await fetch(`${apiUrl}/booking/${invalidBookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${invalidToken}`,
      },
      body: JSON.stringify(updateData),
    });

    expect(response.status).to.not.equal(200);
  });

  //   C. GetBooking Test --- Positive
  it("2C. Get Booking - Positive", async function () {
    const response = await fetch(`${apiUrl}/booking/${bookingID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    expect(response.status).to.equal(200);
    const data = await response.json();
    console.log(data);
  });

  //   C. GetBooking Test --- Negative
  it("2C. Get Booking - Negative", async function () {
    const nonExistentBookingId = 99999;

    const response = await fetch(`${apiUrl}/booking/${nonExistentBookingId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    expect(response.status).to.equal(404);
  });

  //   D. DeleteBooking Test --- Positive
  it("2D. Delete Booking - Positive", async function () {
    const response = await fetch(`${apiUrl}/booking/${bookingID}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).to.equal(201);
  });

  //   D. DeleteBooking Test --- Negative
  it("2D. Delete Booking - Negative", async function () {
    const nonExistentBookingId = 99999;

    const response = await fetch(`${apiUrl}/booking/${nonExistentBookingId}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status).to.not.equal(200);
  });
});
