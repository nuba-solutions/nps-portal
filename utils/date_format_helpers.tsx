import { es } from 'date-fns/locale'
import { format } from 'date-fns'

export function formatLongDateLocale(date: string | number | Date, lang: string) {
    switch (lang) {
        case 'es':
        case 'es-MX':
            return format(new Date(date), `dd MMMM yyyy`, { locale: es })
        case 'en-US':
        default:
            return format(new Date(date), `MMMM dd, yyyy`)
    }
}

export function formatShortDateLocale(date: string | number | Date, lang: string) {
    switch (lang) {
        case 'es':
        case 'es-MX':
            return format(new Date(date), `dd/MM/yyyy`, { locale: es })
        case 'en-US':
        default:
            return format(new Date(date), `MM/dd/yyyy`)
    }
}

export function formatMonthDateLocale(date: string | number | Date, lang: string) {
    switch (lang) {
        case 'es':
        case 'es-MX':
            return format(new Date(date), `MMMM`, { locale: es })
        case 'en-US':
        default:
            return format(new Date(date), `MMMM`)
    }
}