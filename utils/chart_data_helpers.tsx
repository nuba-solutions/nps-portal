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

export const getSegmentedDataByMonth = async (data: Stripe.Invoice[], startDateSixMonthsAgo: Date) => {
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
