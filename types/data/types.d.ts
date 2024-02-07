type TCharge = {
    id: number
    title: string
    description: string
    totalAmount: number
    status?: ChargeStatus | string
    createdAt: Date
    updatedAt: Date
    dueDate: Date
    user?: TUser
    userId: TUser.id
    chargeItems?: TChargeItem[]
    clientProvider?: TClientProvider
    clientProviderId: TClientProvider.id
}

type TChargeItem = {
    id: number
    description: string
    amount: number
    createdAt: Date
    chargeId: number
}

type TUser = {
    id: number
    name: string
    email: string
    password: string
    theme: string
    notificationsEnabled: boolean
    role: ERole
    createdAt: Date
    charges?: TCharge[]
    client_provider: TClientProvider | number
    notifications?: TNotification[]
    stripeId: string
}

enum ERole {
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