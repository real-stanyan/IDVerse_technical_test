class Qantas {
  async open() {
    await browser.url("https://www.qantas.com/au/en.html");
  }

  // A. Develop tests for validation the Qantas logo and login button is displayed on (desktop/Tablet/mobile)
  get logo() {
    return $(".Logo__logoQantas_vaH1iatF");
  }

  get loginButton() {
    return $(".login-ribbon");
  }

  // B. Develop test for Member login --- Negative
  get login_form() {
    return $(".login-widget");
  }

  get login_form_submit_btn() {
    return $(".ql-login-submit-button");
  }

  get login_error_msg() {
    return $(".ql-login-error");
  }

  get input() {
    return $('[data-testid="InlineDialog-Dialog"] input');
  }

  get lang_switch_btn() {
    return $(".DesktopRegionSelector__inputContainer_FVhpvqxU");
  }

  get lang_list() {
    return $("#downshift-:R54:-menu");
  }
  // C. Develop tests for searching flights
  // Departure
  get departure() {
    return $('[data-testid="departure-port"]');
  }

  // Arrival
  get arrival() {
    return $('[data-testid="arrival-port"]');
  }

  // travelDates
  get travelDates() {
    return $('[data-testid="travel-dates"]');
  }

  get travel_calendar() {
    return $(".css-47k6cc-Calendar");
  }

  get calendar_confirm_btn() {
    return $('[data-testid="dialogConfirmation"]');
  }

  get search_container() {
    return $("#tab-flights");
  }

  get search_btn() {
    return $("[data-testid=search-flights-btn]");
  }

  get submit_btn() {
    return $(".submit-btn");
  }

  get list_of_flights() {
    return $(".list-of-flights");
  }
}

export default new Qantas();
