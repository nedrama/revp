export interface GameInterface {
    id?: number,
    title?: string,
    description?: string,
    userId?: number,
}
export interface UserInterface {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    role?: string,
    isCompany?: boolean
}
export interface ReviewInterface {
    id?: number,
    comment?: string,
    rating?: number,
    userId?: number,
    gameId?: number
}