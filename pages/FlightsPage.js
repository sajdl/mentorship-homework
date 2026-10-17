export class FlightsPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://phptravels.net/flights');
  }
}