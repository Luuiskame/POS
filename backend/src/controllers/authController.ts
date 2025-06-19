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
    const tokens = AuthService.login
      ? await AuthService.login({ email: user.email, password: userPassword }) // En caso de login auto
      : generateTokenPair({
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          storeId: user.storeId
        });

    // 3. Establecer cookies
    setAuthCookies(res, tokens.tokens);

    // 4. Respuesta
    return res.status(201).json({
      message: 'Tienda y usuario creados exitosamente',
      user: tokens.user
    });

  } catch (error: any) {
    console.error('Error en createStore:', error);
    return res.status(500).json({
      message: error.message || 'Error al crear la tienda'
    });
  }
};

export const getStore = async (req: Request, res: Response) => {
  
}
function generateTokenPair(arg0: { userId: string; email: string; firstName: string; lastName: string; role: string; storeId: string; }) {
  throw new Error('Function not implemented.');
}

