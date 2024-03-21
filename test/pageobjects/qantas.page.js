class Qantas {
  // 方法来打开Qantas主页
  async open() {
    await browser.url("https://www.qantas.com/au/en.html");
  }

  // 获取Qantas徽标元素
  get logo() {
    return $(".Logo__logoQantas_vaH1iatF");
  }

  // 获取登录按钮元素
  get loginButton() {
    return $(".login-ribbon");
  }

  get input() {
    return $('[data-testid="InlineDialog-Dialog"] input');
  }

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

  get lang_switch_btn() {
    return $(".DesktopRegionSelector__inputContainer_FVhpvqxU");
  }

  get lang_list() {
    return $("#downshift-:R54:-menu");
  }
}

export default new Qantas();
