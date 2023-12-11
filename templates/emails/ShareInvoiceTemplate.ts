import { Session } from "next-auth"

const getShareInvoiceEmailTemplate = (
        session: Session | null,
        invoiceNumber: string,
        invoiceLink: string,
        invoiceAmount: string
    ) => {
    return `
        <!doctype html>
        <html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Nvoicex</title>
            <style type="text/css">
                html,  body {
                    margin: 0 !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                .ExternalClass {
                    width: 100%;
                }
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
                table,  td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
                table table table {
                    table-layout: auto;
                }
                img {
                    -ms-interpolation-mode: bicubic;
                }
                .yshortcuts a {
                    border-bottom: none !important;
                }
                a[x-apple-data-detectors] {
                    color: inherit !important;
                }
            </style>
            <style type="text/css">
                .button-td,
                .button-a {
                    transition: all 100ms ease-in;
                }
                .button-td:hover,
                .button-a:hover {
                    background: #0b155e !important;
                    border-color: #0b155e !important;
                }
                .mTop {
                    margin-top: 50px;
                }
                @media screen and (max-width: 600px) {
                    .email-container {
                        width: 100% !important;
                    }
                    .fluid,
                    .fluid-centered {
                        max-width: 100% !important;
                        height: auto !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .fluid-centered {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .stack-column,
                    .stack-column-center {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                    }
                    .stack-column-center {
                        text-align: center !important;
                    }
                    .center-on-narrow {
                        text-align: center !important;
                        display: block !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                        float: none !important;
                    }
                    table.center-on-narrow {
                        display: inline-block !important;
                    }
                    .mTop {
                        margin-top: 0;
                    }
                }
            </style>
            </head>
            <body bgcolor="#f3f6f8" width="100%" style="margin: 0;" yahoo="yahoo">
                <table bgcolor="#f3f6f8" cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" style="border-collapse:collapse; margin-top: 20px;">
                <tr>
                    <td><center style="width: 100%;" class="mTop">
                        <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;"> ${session?.user.name} is requesting you to pay an invoice. </div>
                        <table align="center" width="600" class="email-container">
                        <tr>
                            <td style="padding: 20px 0; text-align: center; background: #ffffff">
                                <img src="https://www.nvoicex.com/emails/nvoicex-email-brand.png" width="200" height="40" alt="Nvoicex Logo" border="0" />
                            </td>
                        </tr>
                    </table>
                        <table cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#ffffff" width="600" class="email-container">
                        <tr>
                            <td class="full-width-image"><img src="https://www.nvoicex.com/emails/nvoicex-email-banner.png" width="600" alt="Nvoicex Banner" border="0" align="center" style="width: 100%; max-width: 600px; height: auto;"></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 40px 40px; text-align: center; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #555555;">
                                <p style="font-weight: 700; font-size: 18px; margin: 30px 0">INVOICE DETAILS</p>
                                <table style="width: 100%">
                                    <tr>
                                        <td style="text-align: left; font-weight: 600;">Invoice Number</td>
                                        <td style="text-align: right">${invoiceNumber}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <hr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: left; font-weight: 600;">Invoice Amount</td>
                                        <td style="text-align: right">${invoiceAmount}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <hr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="text-align: left; font-weight: 600; padding-bottom: 10px">
                                            Sender
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="text-align: left">${session?.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="text-align: left">${session?.user.email}</td>
                                    </tr>
                                </table>
                            <br>
                            <br>
                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto">
                                <tr>
                                <td style="border-radius: 8px; background: #3649DB; text-align: center;" class="button-td"><a href="${invoiceLink}" style="background: #3649DB; border: 15px solid #3649DB; padding: 0 10px;color: #ffffff; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 8px; font-weight: bold;" class="button-a"> 
                                <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->PAY INVOICE<!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
                                </a></td>
                            </tr>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td background="https://www.nvoicex.com/emails/nvoicex-email-footer.png" bgcolor="#222222" valign="middle" style="text-align: center; background-position: center center !important; background-size: cover !important;"><!--[if gte mso 9]>
                                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:175px; background-position: center center !important;">
                                <v:fill type="tile" src="https://www.nvoicex.com/emails/nvoicex-email-footer.png" color="#222222" />
                                <v:textbox inset="0,0,0,0">
                                <![endif]-->
                            <div>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="middle" style="text-align: center; padding: 40px; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #ffffff;">
                                        Nvoicex is a payment system that allows users from different apps to share their invoices with someone else, usually friends and family. You can effectively make a payment on behalf of whoever sent it to you!
                                    </td>
                                </tr>
                            </table>
                            </div>
                            <!--[if gte mso 9]>
                                </v:textbox>
                                </v:rect>
                                <![endif]--></td>
                        </tr>
                    </table>
                        <table align="center" width="600" class="email-container">
                        <tr>
                            <br>
                            Nvoicex<br>
                            <span class="mobile-link--footer">El Paso, Texas - United States</span><br>
                            <br>
                        </tr>
                    </table>
                    </center></td>
                </tr>
                </table>
            </body>
        </html>
    `
}

export default getShareInvoiceEmailTemplate