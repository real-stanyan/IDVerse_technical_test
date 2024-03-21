import { expect } from "chai";

describe("Booking API Tests", function () {
  const apiUrl = "https://restful-booker.herokuapp.com";
  let bookingID = 0;
  let token = 0;

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
});