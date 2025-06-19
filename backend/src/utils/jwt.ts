import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JWTPayload, TokenPair, CookieConfig } from '../types/auth';

// ========================================
// JWT UTILITIES
// ========================================

/**
 * Genera un access token (corta duración)
 */
export const generateAccessToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
  
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET no está configurado');
  }

  return jwt.sign(payload, secret, { 
    expiresIn,
    issuer: 'pos-app',
    audience: 'pos-users'
  });
};

/**
 * Genera un refresh token (larga duración)
 */
export const generateRefreshToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET no está configurado');
  }

  return jwt.sign(payload, secret, { 
    expiresIn,
    issuer: 'pos-app',
    audience: 'pos-users'
  });
};

/**
 * Genera ambos tokens
 */
export const generateTokenPair = (payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  };
};

/**
 * Verifica un access token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_ACCESS_SECRET;
  
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET no está configurado');
  }

  try {
    return jwt.verify(token, secret, {
      issuer: 'pos-app',
      audience: 'pos-users'
    }) as JWTPayload;
  } catch (error) {
    throw new Error('Token de acceso inválido');
  }
};

/**
 * Verifica un refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET no está configurado');
  }

  try {
    return jwt.verify(token, secret, {
      issuer: 'pos-app',
      audience: 'pos-users'
    }) as JWTPayload;
  } catch (error) {
    throw new Error('Refresh token inválido');
  }
};

// ========================================
// COOKIE UTILITIES
// ========================================

/**
 * Configuración segura para access token cookie
 */
export const getAccessTokenCookieConfig = (): CookieConfig => ({
  httpOnly: true, // No accesible via JavaScript
  secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
  sameSite: 'strict', // Protección CSRF
  maxAge: 15 * 60 * 1000, // 15 minutos en milisegundos
  path: '/' // Disponible en toda la app
});

/**
 * Configuración segura para refresh token cookie
 */
export const getRefreshTokenCookieConfig = (): CookieConfig => ({
  httpOnly: true, // No accesible via JavaScript
  secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
  sameSite: 'strict', // Protección CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
  path: '/api/auth' // Solo disponible en rutas de auth
});

/**
 * Establece las cookies de autenticación en la response
 */
export const setAuthCookies = (res: Response, tokens: TokenPair): void => {
  const accessConfig = getAccessTokenCookieConfig();
  const refreshConfig = getRefreshTokenCookieConfig();

  // Establecer access token cookie
  res.cookie('accessToken', tokens.accessToken, accessConfig);
  
  // Establecer refresh token cookie
  res.cookie('refreshToken', tokens.refreshToken, refreshConfig);
};

/**
 * Limpia las cookies de autenticación
 */
export const clearAuthCookies = (res: Response): void => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/api/auth' });
};

/**
 * Extrae token de las cookies o headers
 */
export const extractTokenFromRequest = (req: any): string | null => {
  // Primero intentar desde cookies
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }
  
  // Fallback: desde Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
};