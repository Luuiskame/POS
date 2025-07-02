import { Request, Response } from 'express';
import { StoreService } from '../../services/storeServices';
import { AuthUser } from '../../types/authTypes';

export const createStore = async (req: Request, res: Response) => {
  console.log('Creating store with body:', req.body);
    try {
        const { storeName, storeAddress, storePhone, storeEmail, userId, role } = req.body;

        console.log('Received data:', {
            storeName,
            storeAddress,
            storePhone,
            storeEmail,
            userId,
            role
        });

        // Validate required fields
        if (!storeName || !storeAddress || !userId) {
             res.status(400).json({
                message: 'Nombre de tienda, dirección y ID de usuario son requeridos'
            });
        }

        // 1. Crear tienda y asignar usuario como ADMIN
        const { store, user } = await StoreService.createStoreAndAssignAdmin({
            storeName,
            storeAddress,
            storePhone,
            storeEmail,
            userId,
            role: role || 'admin' // Default to admin if not provided
        });

        // 2. Respuesta
        res.status(201).json({
            message: 'Tienda creada y usuario asignado como ADMIN',
            store,
            user
        });

    } catch (error: any) {
        console.error('Error al crear tienda:', error.message);
        res.status(500).json({
            message: error.message || 'Error al crear la tienda'
        });
    }
};

export const assignUserToStoreController = async (req: Request, res: Response) => {
  try {
    const { userId, storeId, role } = req.body;

    if (!userId || !storeId || !role) {
      res.status(400).json({ message: 'userId, storeId y role son requeridos.' });
    }

    const user = await StoreService.assignUserToStore({ userId, storeId, role });

    res.status(200).json({ message: 'Usuario asignado exitosamente.', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error al asignar el usuario.' });
  }
};