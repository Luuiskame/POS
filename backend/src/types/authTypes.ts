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

// Payload que va dentro del JWT - información esencial
export interface JWTPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    storeId: string | null; // puede ser null si no pertenece a una tienda
    iat?: number; // issued at
    exp?: number; // expires at
}

export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    storeId: string | null; // puede ser null si no pertenece a una tienda
    store: string | null; // nombre de la tienda
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

// Para validaciones de roles
export interface RolePermissions {
    canAccessMultipleStores: boolean;
    canManageUsers: boolean;
    canManageProducts: boolean;
    canViewReports: boolean;
    canProcessTransactions: boolean;
}

// Helper type para verificar si un usuario tiene permisos
export type RequiredRole = UserRole | UserRole[];