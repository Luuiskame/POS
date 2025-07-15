import { Request } from 'express';

// User roles enum to match Prisma schema
export type UserRole = 'superadmin' | 'admin' | 'manager' | 'cashier';

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
    role?: UserRole; // Optional since it defaults to cashier in schema
    storeId?: string; // Optional since user can be created without store assignment
}

// Para asociar usuario a tienda con rol específico
export interface AssociateUserToStoreRequest {
    userId: string;
    storeId: string;
    role: UserRole;
}

// Store relationship info for users
export interface UserStoreInfo {
    id: string; // UserStore relation ID
    storeId: string;
    storeName: string;
    role: UserRole;
    isActive: boolean;
}

// Payload que va dentro del JWT - información esencial
export interface JWTPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userStores: {
        storeId: string;
        storeName: string;
        role: UserRole;
        isActive: boolean;
    }[];
    activeStore? : UserStoreInfo     
    iat?: number; // issued at
    exp?: number; // expires at
}

export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    userStores: UserStoreInfo[];
    createdAt: Date;
    updatedAt: Date;
}

// Response del login
export interface LoginResponse {
    user: AuthUser;
    message: string;
}

// Response para operaciones de usuario
export interface UserResponse {
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


// Para contexto de tienda específica en requests
export interface StoreContext {
    storeId: string;
    storeName: string;
    userRole: UserRole;
}

// Extended request with store context
export interface StoreAuthenticatedRequest extends AuthenticatedRequest {
    storeContext?: StoreContext;
}