import bcrypt from 'bcryptjs';
import { prisma } from '../app';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthUser, 
  JWTPayload,
  TokenPair 
} from '../types/authTypes';

import { generateTokenPair } from '../utils/jwt';

export class UserService {
    static async registerUser(data: RegisterCredentials): Promise<AuthUser> {
    try {
      // 1. Verificar email único
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // 2. Verificar que la tienda existe
      const store = await prisma.store.findUnique({
        where: { id: data.storeId }
      });

      if (!store) {
        throw new Error('La tienda no existe');
      }

      // 3. Hashear contraseña
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // 4. Crear usuario
      const user = await prisma.user.create({
        data: {
          email: data.email,
          passwordHash: hashedPassword, // ⭐ passwordHash
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          storeId: data.storeId
        },
        include: {
          store: true
        }
      });

      // 5. Retornar usuario formateado
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        storeId: user.storeId,
        store: user.store.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
  }

  static  async createSuperAdmin (data: RegisterCredentials): Promise<AuthUser> {
      try {
        // 1. Verificar que el email no exista
        const existingUser = await prisma.user.findUnique({
          where: { email: data.email }
        });
  
        if (existingUser) {
          throw new Error('El email ya está registrado');
        }
  
        // 2. Hashear contraseña
        const hashedPassword = await bcrypt.hash(data.password, 12);
  
        // 3. Crear usuario superadmin
        const user = await prisma.user.create({
          data: {
            email: data.email,
            passwordHash: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            storeId: data.storeId
          }
        });
  
        // 4. Retornar usuario formateado
        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          storeId: user.storeId,
          store: 'The superadmin store', // Superadmin no tiene tienda
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
  
      } catch (error) {
        console.error('Error creando superadmin:', error);
        throw error;
      }
    }
}
