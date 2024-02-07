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
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        {
                            url: '/notifications',
                            name: 'Notifications',
                        },
                        {
                            url: '/account',
                            name: 'Account',
                        },
                    ]
                },
                {
                    group: 'ui',
                    items: [
                        {
                            url: '/components/buttons',
                            name: 'Buttons',
                        },
                        {
                            url: '/components/inputs',
                            name: 'Inputs',
                        },
                        {
                            url: '/components/toasts',
                            name: 'Toasts',
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
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        {
                            url: '/notifications',
                            name: 'Notifications',
                        },
                        {
                            url: '/account',
                            name: 'Account',
                        },
                    ]
                }
            ]
        },
        {
            name: 'tropicana_properties',
            display_name: "Tropicana Properties",
            id: 4,
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
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        {
                            url: '/notifications',
                            name: 'Notifications',
                        },
                        {
                            url: '/account',
                            name: 'Account',
                        },
                    ]
                }
            ]
        },
        {
            name: 'warrior_allegiance',
            display_name: "Warrior Allegiance",
            id: 3,
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
                        }
                    ]
                },
                {
                    group: 'payments',
                    items: [
                        {
                            url: '/charges/open',
                            name: 'Open Charges',
                        },
                        {
                            url: '/charges/history',
                            name: 'Charges History',
                        }
                    ]
                },
                {
                    group: 'user',
                    items: [
                        {
                            url: '/notifications',
                            name: 'Notifications',
                        },
                        {
                            url: '/account',
                            name: 'Account',
                        },
                    ]
                },
                {
                    group: 'claims',
                    items: [
                        {
                            url: '/introduction',
                            name: "Introduction",
                        },
                        {
                            url: '/ptsd-claims',
                            name: 'PTSD Claims',
                        },
                        {
                            url: '/eye-conditions',
                            name: 'Eye Conditions',
                        },
                        {
                            url: '/respiratory-system',
                            name: 'Respiratory System',
                        }
                    ]
                }
            ]
        }
    ]
}

export default themingConfig