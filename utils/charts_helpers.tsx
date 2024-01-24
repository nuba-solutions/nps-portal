import { Locale } from "@/i18n.config";
import { addMonths, format, isSameMonth, subMonths } from "date-fns";
import Stripe from "stripe";
import { formatMonthDateLocale } from "./date_format_helpers";

export const getPaidInvoicesInPastSixMonths = async (paidInvoices: Stripe.Invoice[]) => {
    let paidInPastSixMonthsArray: Stripe.Invoice[] = []
    const today = new Date()
    const startDateSixMonthsAgo = subMonths(addMonths(today, 1), 6)
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
    const startDateTwelveMonthsAgo = subMonths(addMonths(today, 1), 12)
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

export const getSegmentedDataByMonthSix = async (data: Stripe.Invoice[], startDateSixMonthsAgo: Date, lang: Locale) => {
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
            name: formatMonthDateLocale(startDateSixMonthsAgo, lang).toUpperCase(),
            amt: sumOfFistMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateSixMonthsAgo, 1), lang).toUpperCase(),
            amt: sumOfSecondMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateSixMonthsAgo, 2), lang).toUpperCase(),
            amt: sumOfThirdMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateSixMonthsAgo, 3), lang).toUpperCase(),
            amt: sumOfFourthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateSixMonthsAgo, 4), lang).toUpperCase(),
            amt: sumOfFifthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateSixMonthsAgo, 5), lang).toUpperCase(),
            amt: sumOfSixthMonth
        },
    ]
}

export const getSegmentedDataByMonthTwelve = async (data: Stripe.Invoice[], startDateTwelveMonthsAgo: Date, lang: Locale) => {
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
            name: formatMonthDateLocale(startDateTwelveMonthsAgo, lang).toUpperCase(),
            amt: sumOfFistMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 1), lang).toUpperCase(),
            amt: sumOfSecondMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 2), lang).toUpperCase(),
            amt: sumOfThirdMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 3), lang).toUpperCase(),
            amt: sumOfFourthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 4), lang).toUpperCase(),
            amt: sumOfFifthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 5), lang).toUpperCase(),
            amt: sumOfSixthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 6), lang).toUpperCase(),
            amt: sumOfSeventhMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 7), lang).toUpperCase(),
            amt: sumOfEighthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 8), lang).toUpperCase(),
            amt: sumOfNinthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 9), lang).toUpperCase(),
            amt: sumOfTenthMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 10), lang).toUpperCase(),
            amt: sumOfEleventhMonth
        },
        {
            name: formatMonthDateLocale(addMonths(startDateTwelveMonthsAgo, 11), lang).toUpperCase(),
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
