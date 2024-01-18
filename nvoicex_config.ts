const themingConfig = {
    providers: [
        {
            name: 'nvoicex',
            display_name: "Nvoicex",
            id: 1,
            logo_url: {
                light: '/providers/nvoicex_color.svg',
                dark: '/providers/nvoicex_white.svg'
            },
            learn3Enabled: false,
            menus: [
                {
                    group: 'common',
                    items: [
                        {
                            url: '/dashboard',
                            name: 'Dashboard',
                            page_info: {
                                title: 'Dashboard',
                                description: 'Welcome to Nvoicex'
                            }
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                            page_info: {
                                title: 'Open Charges',
                                description: 'Your pending payments'
                            }
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                            page_info: {
                                title: 'Charges History',
                                description: 'A list of all your payments'
                            }
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        // {
                        //     url: '/messages',
                        //     name: 'Messages',
                        //     page_info: {
                        //         title: 'Messages',
                        //         description: 'Your received messages'
                        //     }
                        // },
                        {
                            url: '/notifications',
                            name: 'Notifications',
                            page_info: {
                                title: 'Notifications',
                                description: 'Keep up with your latest events'
                            }
                        },
                        {
                            url: '/account',
                            name: 'Account',
                            page_info: {
                                title: 'Account',
                                description: 'User account manager'
                            }
                        },
                    ]
                },
                {
                    group: 'ui',
                    items: [
                        {
                            url: '/components/buttons',
                            name: 'Buttons',
                            page_info: {
                                title: 'Button Components',
                                description: 'Button component details and usage'
                            }
                        },
                        {
                            url: '/components/inputs',
                            name: 'Inputs',
                            page_info: {
                                title: 'Input Components',
                                description: 'Input component details and usage'
                            }
                        },
                        {
                            url: '/components/toasts',
                            name: 'Toasts',
                            page_info: {
                                title: 'Toast Components',
                                description: 'Toast component details and usage'
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'piedras_mundiales',
            display_name: "Piedras Mundiales",
            id: 2,
            logo_url: {
                light: '/providers/piedras_mundiales_color.svg',
                dark: '/providers/piedras_mundiales_white.svg'
            },
            learn3Enabled: false,
            menus: [
                {
                    group: 'common',
                    items: [
                        {
                            url: '/dashboard',
                            name: 'Dashboard',
                            page_info: {
                                title: 'Dashboard',
                                description: 'Welcome to Nvoicex'
                            }
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                            page_info: {
                                title: 'Open Charges',
                                description: 'Your pending payments'
                            }
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                            page_info: {
                                title: 'Charges History',
                                description: 'A list of all your payments'
                            }
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        // {
                        //     url: '/messages',
                        //     name: 'Messages',
                        //     page_info: {
                        //         title: 'Messages',
                        //         description: 'Your received messages'
                        //     }
                        // },
                        {
                            url: '/notifications',
                            name: 'Notifications',
                            page_info: {
                                title: 'Notifications',
                                description: 'Keep up with your latest events'
                            }
                        },
                        {
                            url: '/account',
                            name: 'Account',
                            page_info: {
                                title: 'Account',
                                description: 'User account manager'
                            }
                        },
                    ]
                }
            ]
        },
        {
            name: 'tropicana_properties',
            display_name: "Tropicana Properties",
            id: 3,
            logo_url: {
                light: '/providers/tropicana_properties_color.svg',
                dark: '/providers/tropicana_properties_white.svg'
            },
            learn3Enabled: false,
            menus: [
                {
                    group: 'common',
                    items: [
                        {
                            url: '/dashboard',
                            name: 'Dashboard',
                            page_info: {
                                title: 'Dashboard',
                                description: 'Welcome to Nvoicex'
                            }
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                            page_info: {
                                title: 'Open Charges',
                                description: 'Your pending payments'
                            }
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                            page_info: {
                                title: 'Charges History',
                                description: 'A list of all your payments'
                            }
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        // {
                        //     url: '/messages',
                        //     name: 'Messages',
                        //     page_info: {
                        //         title: 'Messages',
                        //         description: 'Your received messages'
                        //     }
                        // },
                        {
                            url: '/notifications',
                            name: 'Notifications',
                            page_info: {
                                title: 'Notifications',
                                description: 'Keep up with your latest events'
                            }
                        },
                        {
                            url: '/account',
                            name: 'Account',
                            page_info: {
                                title: 'Account',
                                description: 'User account manager'
                            }
                        },
                    ]
                }
            ]
        },
        {
            name: 'warrior_allegiance',
            display_name: "Warrior Allegiance",
            id: 4,
            logo_url: {
                light: '/providers/warrior_allegiance_color.svg',
                dark: '/providers/warrior_allegiance_white.svg'
            },
            learn3Enabled: true,
            learn3Links: {
                preferences: 'https://warriorallegiance.com/',
                messages: 'https://warriorallegiance.com/',
                ptsd_claims: 'https://warrior.learn3.org/mod/page/view.php?id=9',
                eye_conditions: 'https://warrior.learn3.org/mod/page/view.php?id=13',
                respiratory_system: 'https://warrior.learn3.org/mod/page/view.php?id=14',
                introduction: 'https://warriorallegiance.com/'
            },
            menus: [
                {
                    group: 'common',
                    items: [
                        {
                            url: '/dashboard',
                            name: 'Dashboard',
                            page_info: {
                                title: 'Dashboard',
                                description: 'Welcome to Nvoicex'
                            }
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                            page_info: {
                                title: 'Open Charges',
                                description: 'Your pending payments'
                            }
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                            page_info: {
                                title: 'Charges History',
                                description: 'A list of all your payments'
                            }
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        // {
                        //     url: '/messages',
                        //     name: 'Messages',
                        //     page_info: {
                        //         title: 'Messages',
                        //         description: 'Your received messages'
                        //     }
                        // },
                        {
                            url: '/notifications',
                            name: 'Notifications',
                            page_info: {
                                title: 'Notifications',
                                description: 'Keep up with your latest events'
                            }
                        },
                        {
                            url: '/account',
                            name: 'Account',
                            page_info: {
                                title: 'Account',
                                description: 'User account manager'
                            }
                        },
                    ]
                },
                {
                    group: 'claims',
                    items: [
                        {
                            url: '/introduction',
                            name: "Introduction",
                            page_info: {
                                title: "Introduction",
                                description: "This is the main Introduction"
                            }
                        },
                        {
                            url: '/ptsd-claims',
                            name: 'PTSD Claims',
                            page_info: {
                                title: 'PTSD Claims',
                                description: 'Manage all PTSD related inquiries'
                            }
                        },
                        {
                            url: '/eye-conditions',
                            name: 'Eye Conditions',
                            page_info: {
                                title: 'Eye Conditions',
                                description: 'Manage all Eye related inquiries'
                            }
                        },
                        {
                            url: '/respiratory-system',
                            name: 'Respiratory System',
                            page_info: {
                                title: 'Respiratory System / ENT',
                                description: 'Manage all respiratory related inquiries'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

export default themingConfig