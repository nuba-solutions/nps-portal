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
                        {
                            url: '/messages',
                            name: 'Messages',
                            page_info: {
                                title: 'Messages',
                                description: 'Your received messages'
                            }
                        },
                        {
                            url: '/preferences',
                            name: 'Preferences',
                            page_info: {
                                title: 'Preferences',
                                description: 'User preferences manager'
                            }
                        }
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
                        {
                            url: '/messages',
                            name: 'Messages',
                            page_info: {
                                title: 'Messages',
                                description: 'Your received messages'
                            }
                        },
                        {
                            url: '/preferences',
                            name: 'Preferences',
                            page_info: {
                                title: 'Preferences',
                                description: 'User preferences manager'
                            }
                        }
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
                        {
                            url: '/messages',
                            name: 'Messages',
                            page_info: {
                                title: 'Messages',
                                description: 'Your received messages'
                            }
                        },
                        {
                            url: '/preferences',
                            name: 'Preferences',
                            page_info: {
                                title: 'Preferences',
                                description: 'User preferences manager'
                            }
                        }
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
                preferences: 'https://nubasolutions.com',
                messages: 'https://warriorallegiance.com/',
                ptsd_claims: 'https://learn3.southcentralus.cloudapp.azure.com/mod/page/view.php?id=54',
                eye_conditions: 'https://learn3.southcentralus.cloudapp.azure.com/mod/page/view.php?id=55',
                respiratory_system: 'https://learn3.southcentralus.cloudapp.azure.com/mod/page/view.php?id=56'
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
                        {
                            url: '/messages',
                            name: 'Messages',
                            page_info: {
                                title: 'Messages',
                                description: 'Your received messages'
                            }
                        },
                        {
                            url: '/preferences',
                            name: 'Preferences',
                            page_info: {
                                title: 'Preferences',
                                description: 'User preferences manager'
                            }
                        }
                    ]
                },
                {
                    group: 'claims',
                    items: [
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