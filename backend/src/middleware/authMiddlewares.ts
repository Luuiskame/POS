import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractTokenFromRequest } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = extractTokenFromRequest(req);

  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return; // 👈🏼 Required to stop execution
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
