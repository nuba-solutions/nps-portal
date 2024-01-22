import { es } from 'date-fns/locale'
import { format } from 'date-fns'

export function formatLongDateLocale(date: string | number | Date, lang: string) {
    switch (lang) {
        case 'es':
            return format(new Date(date), `dd MMMM yyyy`, { locale: es })
        default:
            return format(new Date(date), `MMMM dd, yyyy`)
    }
}

export function formatShortDateLocale(date: string | number | Date, lang: string) {
    switch (lang) {
        case 'es':
            return format(new Date(date), `dd MM yyyy`, { locale: es })
        default:
            return format(new Date(date), `MM dd, yyyy`)
    }
}