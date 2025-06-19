import { Request } from 'express';


// Para LOGIN solo necesitamos email y password
export interface LoginCredentials {
    email: string;
    password: string;
}

// Para REGISTRO necesitamos todos los datos
export interface RegisterCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'CASHIER' | 'ADMIN' | 'MANAGER';
    storeId: string;
}

// Payload que va dentro del JWT - información esencial
export interface JWTPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    storeId: string;
    iat?: number; // issued at
    exp?: number; // expires at
}

// Datos del usuario autenticado (sin password)
export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    storeId: string;
    store: string; // nombre de la tienda
    createdAt: Date;
    updatedAt: Date;
}

// Response del login
export interface LoginResponse {
    user: AuthUser;
    message: string;
}

// Configuración de cookies
export interface CookieConfig {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    maxAge: number;
    path: string;
}

// Tokens generados
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

// Request extendido con usuario autenticado
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}