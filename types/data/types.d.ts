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
    createdAt: Date
    charges?: TCharge[]
    preferences?: TUserPreferences[]
}

type TUserPreferences = {
    id: number,
    theme: string,
    notificationsEnabled: boolean,
    userId: TUser.id
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