export class FlightsPage {
    constructor(page) {
        this.page = page;
        this.originTrigger = page.locator('#fl_from_trigger');
        this.originLabel = this.originTrigger.getByText('Departure City or Airport');
        this.originInput = page.getByRole('textbox', {
            name: 'Departure City or Airport'
        });
        this.destinationTrigger = page.locator('#fl_to_trigger');
        this.destinationLabel = this.destinationTrigger.getByText('Arrival City or Airport');
        this.destinationInput = page.getByRole('textbox', {
            name: 'Arrival City or Airport'
        });
        this.departureDateInput = page.getByRole('textbox', {
            name: 'Departure Date'
        });
        this.nextDecade = page.locator('.datepicker-years .next .inline-block')
            .first();
        this.previousDecade = page.locator('.datepicker-years .prev .inline-block')
            .first();
        this.oneWayButton = page.getByRole('button', {
            name: 'One Way'
        });
        this.passengerSelector = page.getByText('Passengers', {
            exact: true
        });
        this.adultAddButton = page
            .getByText('Adults', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('button', { name: 'add' });
    }

    async goto() {
        await this.page.goto('https://phptravels.net/flights');
    }

    async acceptConsent() {
        const confirmationButton = this.page.getByRole('button', {
            name: 'I Understand & Continue'
        });

        if (await confirmationButton.isVisible()) {
            await confirmationButton.click();
        }
    }

    async selectOrigin(city, airport) {
        await this.originLabel.click();
        await this.originInput.fill(city);
        await this.page.getByText(airport, { exact: true }).click();
    }

    async selectDestination(city, airport) {
        await this.destinationLabel.click();
        await this.destinationInput.fill(city);
        await this.page.getByText(airport, { exact: true }).click();
    }

    async selectDepartureDate(date) {
        const today = new Date();

        const currentYear = today.getFullYear();
        const currentMonth = today.toLocaleString('en-US', {
            month: 'long'
        });

        const targetYear = date.getFullYear();
        const targetMonth = date.toLocaleString('en-US', {
            month: 'short'
        });
        const targetDay = date.getDate();

        // Open calendar
        await this.departureDateInput.click();

        // Open month selection
        await this.page.getByRole('columnheader', {
            name: currentMonth,
        }).click();

        // Change year if necessary
        if (targetYear !== currentYear) {
            await this.page.getByRole('columnheader', {
                name: String(currentYear),
                exact: true
            }).click();

            // Navigate between decades
            const currentDecade = Math.floor(currentYear / 10);
            const targetDecade = Math.floor(targetYear / 10);
            const difference = targetDecade - currentDecade;

            for (let i = 0; i < Math.abs(difference); i++) {
                if (difference > 0) {
                    await this.nextDecade.click();
                } else {
                    await this.previousDecade.click();
                }
            }

            // Select year
            await this.page.getByRole('cell')
                .getByText(String(targetYear), { exact: true })
                .click();
        }

        // Select month
        await this.page.getByRole('cell')
            .getByText(targetMonth, { exact: true })
            .click();

        // Select day
        await this.page.getByRole('table')
            .locator('.day:not(.old):not(.new):not(.disabled)')
            .getByText(String(targetDay), { exact: true })
            .click();
    }

    async selectPassengers(adults) {
        await this.passengerSelector.click();

        for (let i = 1; i < adults; i++) {
            await this.adultAddButton.click();
        }
    }
}