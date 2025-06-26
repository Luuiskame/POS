import { Request, Response } from 'express';
import { AuthService } from '../../services/authServices';

export const associateUserToStore = async (req: Request, res: Response) => {
  try {
    const { userId, storeId } = req.body;

    const user = await AuthService.associateUserToStore(userId, storeId);

    res.status(200).json({
      message: 'Usuario asociado exitosamente a la tienda',
      user
    });

  } catch (error: any) {
    console.error('Error en associateUserToStore:', error.message);
    res.status(500).json({
      message: error.message || 'Error al asociar usuario a tienda'
    });
  }
};
