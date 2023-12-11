import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.CONTACT_EMAIL_ADDRESS,
        pass: process.env.CONTACT_EMAIL_PASSWORD
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
    }
})