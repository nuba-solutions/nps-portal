type TCharge = {
    id: number
    title: string
    description: string
    totalAmount: number
    createdAt: Date
    updatedAt: Date
    userId: TUser.id
}

type TUser = {
    id: number
    name: string
    email: string
    password: string
    theme: string
    notificationsEnabled: boolean
    role: TUserRole
    createdAt: Date
    charges?: TCharge[]
    client_provider: TClientProvider | number
    notifications?: TNotification[]
    stripeId: string
}

enum TRole {
    MASTER,
    ADMIN,
    USER
}

type TUserProfile = {
	user: {
		accessToken: JWT
	} & {
		name?: string  | null | undefined
		email?: string  | null | undefined
		image?: string | null | undefined
	} | undefined
}

type TClientProvider = {
    id: number,
    name: string,
    displayName: string,
    logo_url: {
        dark: string,
        light: string
    }
    learn3Enabled: boolean
    learn3Links?: {
        messages?: string
        preferences?: string
        dashboard?: string
        open_charges?: string
        charges_history?: string
        ptsd_claims?: string
        eye_conditions?: string
        respiratory_system?: string
        introduction?: string
    } | undefined
    menus: TClientMenu[]
    userNotificationsCount: number
}

type TClientMenu = {
    group: string,
    items: TClientMenuItem[]
}

type TClientMenuItem = {
    url: string
    name: string
    page_info: TClientMenuItemPageInfo
}

type TClientMenuItemPageInfo = {
    title: string
    description: string
}

type TNotification = {
    id: string | number
    title: string
    description: string
    createdAt: Date
    userId: TUser.id
    subject: string | {
        prefix: string
        suffix: string
    }
}