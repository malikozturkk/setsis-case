export interface SliceTypes {
    user: boolean
    userName: string
    refreshToken: string | null | boolean,
}

export interface ReduxStates {
    auth: SliceTypes
}