import themingConfig from '@/nvoicex.config'

export const getClientProviders = () => {
    return themingConfig.providers
}

export const getUserClientProvider = async (provider: unknown) => {
    return themingConfig.providers.find(pvd => pvd.id === provider)
}

export const getClientProviderPageInfo = async (provider: unknown, page: string) => {
    const pvd = themingConfig.providers.find(pvd => pvd.id === provider)

    const preferenceMenuGroup = pvd?.menus.find(menuGroup => {
        return menuGroup.items.some(menuItem => {
            return menuItem.url === `/${page}`;
        });
    });

    if (preferenceMenuGroup) {
        const preferenceMenuItem = preferenceMenuGroup.items.find(menuItem => {
            return menuItem.url === `/${page}`;
        });

        return preferenceMenuItem
    } else {
        return null
    }
}