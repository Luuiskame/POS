import { Request, Response } from 'express';
import { AuthService } from '../services/authServices';
import { AuthUser, RegisterCredentials, LoginCredentials } from '../types/authTypes';
import { setAuthCookies } from '../utils/jwt';
import { UserService } from '../services/userServices';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginCredentials = req.body;

    // Validate required fields
    if (!email || !password) {
       res.status(400).json({
        message: 'Email y contraseña son requeridos'
      });
    }

    // 1. Iniciar sesión
    const { user, tokens } = await AuthService.login({ email, password });

    // 2. Establecer cookies
    setAuthCookies(res, tokens);

    // 3. Respuesta
    res.status(200).json({
      message: 'Logged in successfully',
      user,
      // tokens are set in cookies, not returned in response for security
    });

  } catch (error: any) {
    console.error('Error en login:', error.message);
    res.status(401).json({
      message: error.message || 'Credenciales inválidas'
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      storeId 
    }: RegisterCredentials = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
        message: 'Email, contraseña, nombre y apellido son requeridos'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
         res.status(400).json({
        message: 'Formato de email inválido'
      });
    }

    // 1. Create user
    const user: AuthUser = await AuthService.createUser({
      email: email.toLowerCase().trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role,
      storeId
    });

    // 2. Return success response (don't auto-login, require explicit login)
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        userStores: user.userStores,
        createdAt: user.createdAt
      }
    });

  } catch (error: any) {
    console.error('Error creando usuario:', error.message);

    // Generic error response
    res.status(500).json({
      message: error.message || 'Error interno del servidor'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Limpiar cookies de autenticación
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/api/auth' });

    res.status(200).json({
      message: 'Sesión cerrada exitosamente'
    });
  } catch (error: any) {
    console.error('Error en logout:', error.message);
    res.status(500).json({
      message: error.message || 'Error al cerrar sesión'
    });
  }
}


