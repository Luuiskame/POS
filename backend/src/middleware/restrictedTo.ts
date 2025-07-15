import { Request, Response, NextFunction } from 'express';
import { JWTPayload, UserRole } from '../types/authTypes';

export const restrictTo = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Autenticación requerida' });
      return;
    }

    const userRole = (req.user as JWTPayload).activeStore?.role;

    if (!allowedRoles.includes(userRole as UserRole)) {
      res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
      return;
    }

    next();
  };
};