import { addMonths, format, isSameMonth, subMonths } from "date-fns";
import Stripe from "stripe";

export const getPaidInvoicesInPastSixMonths = async (paidInvoices: Stripe.Invoice[]) => {
    let paidInPastSixMonthsArray: Stripe.Invoice[] = []
    const today = new Date()
    const startDateSixMonthsAgo = subMonths(today, 6)
    paidInvoices.forEach((inv: Stripe.Invoice)=> {
        if (inv.status_transitions.paid_at &&
            new Date(inv.status_transitions.paid_at * 1000) >= startDateSixMonthsAgo) {
                paidInPastSixMonthsArray.push(inv)
        }
    })
    return {
        data: paidInPastSixMonthsArray,
        startDate: startDateSixMonthsAgo
    }
}

export const getPaidInvoicesInPastTwelveMonths = async (paidInvoices: Stripe.Invoice[]) => {
    let paidInPastTwelveMonthsArray: Stripe.Invoice[] = []
    const today = new Date()
    const startDateTwelveMonthsAgo = subMonths(today, 12)
    paidInvoices.forEach((inv: Stripe.Invoice)=> {
        if (inv.status_transitions.paid_at &&
            new Date(inv.status_transitions.paid_at * 1000) >= startDateTwelveMonthsAgo) {
                paidInPastTwelveMonthsArray.push(inv)
        }
    })
    return {
        data: paidInPastTwelveMonthsArray,
        startDate: startDateTwelveMonthsAgo
    }
}

export const getSegmentedDataByMonthSix = async (data: Stripe.Invoice[], startDateSixMonthsAgo: Date) => {
    let sumOfFistMonth = 0
    let sumOfSecondMonth = 0
    let sumOfThirdMonth = 0
    let sumOfFourthMonth = 0
    let sumOfFifthMonth = 0
    let sumOfSixthMonth = 0

    data.forEach((inv) => {
        if (inv.status_transitions.paid_at && isSameMonth(new Date(startDateSixMonthsAgo), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFistMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateSixMonthsAgo, 1)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfSecondMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateSixMonthsAgo, 2)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfThirdMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateSixMonthsAgo, 3)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFourthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateSixMonthsAgo, 4)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFifthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateSixMonthsAgo, 5)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfSixthMonth += inv.amount_paid
        }
    })

    return [
        {
            name: format(startDateSixMonthsAgo, "MMMM"),
            amt: sumOfFistMonth
        },
        {
            name: format(addMonths(startDateSixMonthsAgo, 1), "MMMM"),
            amt: sumOfSecondMonth
        },
        {
            name: format(addMonths(startDateSixMonthsAgo, 2), "MMMM"),
            amt: sumOfThirdMonth
        },
        {
            name: format(addMonths(startDateSixMonthsAgo, 3), "MMMM"),
            amt: sumOfFourthMonth
        },
        {
            name: format(addMonths(startDateSixMonthsAgo, 4), "MMMM"),
            amt: sumOfFifthMonth
        },
        {
            name: format(addMonths(startDateSixMonthsAgo, 5), "MMMM"),
            amt: sumOfSixthMonth
        },
    ]
}

export const getSegmentedDataByMonthTwelve = async (data: Stripe.Invoice[], startDateTwelveMonthsAgo: Date) => {
    let sumOfFistMonth = 0
    let sumOfSecondMonth = 0
    let sumOfThirdMonth = 0
    let sumOfFourthMonth = 0
    let sumOfFifthMonth = 0
    let sumOfSixthMonth = 0
    let sumOfSeventhMonth = 0
    let sumOfEighthMonth = 0
    let sumOfNinthMonth = 0
    let sumOfTenthMonth = 0
    let sumOfEleventhMonth = 0
    let sumOfTwelfthMonth = 0

    data.forEach((inv) => {
        if (inv.status_transitions.paid_at && isSameMonth(new Date(startDateTwelveMonthsAgo), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFistMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 1)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfSecondMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 2)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfThirdMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 3)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFourthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 4)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfFifthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 5)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfSixthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 6)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfSeventhMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 7)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfEighthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 8)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfNinthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 9)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfTenthMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 10)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfEleventhMonth += inv.amount_paid
        }

        if (inv.status_transitions.paid_at && isSameMonth(new Date(addMonths(startDateTwelveMonthsAgo, 11)), new Date(inv.status_transitions.paid_at * 1000))) {
            sumOfTwelfthMonth += inv.amount_paid
        }
    })

    return [
        {
            name: format(startDateTwelveMonthsAgo, "MMMM"),
            amt: sumOfFistMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 1), "MMMM"),
            amt: sumOfSecondMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 2), "MMMM"),
            amt: sumOfThirdMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 3), "MMMM"),
            amt: sumOfFourthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 4), "MMMM"),
            amt: sumOfFifthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 5), "MMMM"),
            amt: sumOfSixthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 6), "MMMM"),
            amt: sumOfSeventhMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 7), "MMMM"),
            amt: sumOfEighthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 8), "MMMM"),
            amt: sumOfNinthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 9), "MMMM"),
            amt: sumOfTenthMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 10), "MMMM"),
            amt: sumOfEleventhMonth
        },
        {
            name: format(addMonths(startDateTwelveMonthsAgo, 11), "MMMM"),
            amt: sumOfTwelfthMonth
        },
    ]
}

export const getProviderColors = async (provider: TClientProvider) => {
    switch (provider.name) {
        case 'warrior_allegiance':
            return {
                base: '#ECB61E',
                accent: '#D4A41B'
            }
        case 'piedras_mundiales':
            return {
                base: '#C22833',
                accent: '#d22223'
            }
        case 'tropicana_properties':
            return {
                base: '#87BC52',
                accent: '#9FC975'
            }
        default:
            return {
                base: '#3649DB',
                accent: '#8692E9'
            }
    }
}
