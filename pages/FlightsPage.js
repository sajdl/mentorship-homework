export class FlightsPage {
    constructor(page) {
        this.page = page;
        this.originTrigger = page.locator('#fl_from_trigger');
        this.originInput = page.getByRole('textbox', {
            name: 'Departure City or Airport'
        });
    }

    async goto() {
        await this.page.goto('https://phptravels.net/flights');

        const confirmationButton = this.page.getByRole('button', {
            name: 'I Understand & Continue'
        });

        if (await confirmationButton.isVisible()) {
            await confirmationButton.click();
        }
    }

    async selectOrigin(city, airport) {
        await this.originTrigger.getByText('Departure City or Airport').click();
        await this.originInput.fill(city);
        await this.page.getByText(airport, { exact: true }).click();
    }
}