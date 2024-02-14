import axios from "axios"

export const getTenantProviders = async () => {
    try {
        const { data: tenantProviders } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/tenants`)

        return tenantProviders ? tenantProviders : null
    } catch (error) {
        console.error(error)
        return error
    }
}