export function generateRandomFutureDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Random year
    const minYear = tomorrow.getFullYear();
    const maxYear = minYear + 10;

    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

    // Random month (0 = January, 11 = December)
    const minMonth = year === minYear ? tomorrow.getMonth() : 0;

    const month = Math.floor(Math.random() * (12 - minMonth)) + minMonth;

    // Random day
    const minDay = year === minYear && month === tomorrow.getMonth()
        ? tomorrow.getDate()
        : 1;

    const maxDay = new Date(year, month + 1, 0).getDate();

    const day = Math.floor(Math.random() * (maxDay - minDay + 1)) + minDay;

    return new Date(year, month, day);
}