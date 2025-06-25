// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authServices';
import { setAuthCookies } from '../utils/jwt';

export const createStore = async (req: Request, res: Response) => {
  try {
    const {
      storeName,
      storeAddress,
      storePhone,
      storeEmail,
      userEmail,
      userPassword,
      userFirstName,
      userLastName
    } = req.body;

    // 1. Registrar tienda y usuario
    const { store, user } = await AuthService.registerStore({
      storeName,
      storeAddress,
      storePhone,
      storeEmail,
      userEmail,
      userPassword,
      userFirstName,
      userLastName
    });

    // 2. Generar tokens
    const { user: loggedUser, tokens } = await AuthService.login({
      email: user.email,
      password: userPassword
});

    // 3. Establecer cookies
    setAuthCookies(res, tokens);

    // 4. Respuesta
    res.status(201).json({
      message: 'Tienda y usuario creados exitosamente',
      user: loggedUser,
      tokens
    });

  } catch (error: any) {
    console.error('Error en createStore:', error.message);
    res.status(500).json({
      message: error.message || 'Error al crear la tienda'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Iniciar sesión
    const { user, tokens } = await AuthService.login({ email, password });

    // 2. Establecer cookies
    setAuthCookies(res, tokens);

    // 3. Respuesta
    res.status(200).json({
      message: 'Logged in successfully',
      user,
      // tokens
    });

  } catch (error: any) {
    console.error('Error en login:', error.message);
    res.status(401).json({
      message: error.message || 'Credenciales inválidas'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Limpiar cookies de autenticación
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/api/auth' });

    // Respuesta de éxito
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

