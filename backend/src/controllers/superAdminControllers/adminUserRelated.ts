// src/controllers/authController.ts
import { Request, Response } from 'express';
import { setAuthCookies } from '../../utils/jwt';
import { StoreService } from '../../services/storeServices';
import { AuthService } from '../../services/authServices';

export const createStoreAndUser = async (req: Request, res: Response) => {
  try {
    const {
      storeName,
      storeAddress,
      storePhone,
      storeEmail,
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      role
    } = req.body;

    // 1. Registrar tienda y usuario
    const { store, user } = await StoreService.registerStoreAndUser({
      storeName,
      storeAddress,
      storePhone,
      storeEmail,
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      role
    });

    // 2. Generar tokens
    const { user: loggedUser, tokens } = await AuthService.login({
      email: user.email,
      password: userPassword
});

  if(!tokens) {
      return res.status(400).json({
        message: 'El usuario debe seleccionar una tienda para continuar.',
        user: loggedUser
      });
  }
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