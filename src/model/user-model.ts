import { Role, User } from "@prisma/client"

export type UserResponse = {
    id: number
    username: string
    name: string
    email: string
    role: Role
    updated_at: Date
    created_at: Date
}

export type UserTokenResponse = {
    data: UserResponse
    token: string
}

export type RegisterRequest = {
    username: string
    name: string
    password: string
    email: string
    role: Role
}

export type UpdateUserRequest = {
    username?: string
    name?: string
    password?: string
    email?: string
}

export type LoginRequest = {
    email: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
}

export function toUserArrayResponse(users: User[]): UserResponse[] {
    return users.map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }));
}

export function toUserTokenResponse(user: User, token: string): UserTokenResponse {
    return {
        data: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at
        },
        token: token
    }
}