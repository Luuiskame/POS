import bcrypt from 'bcryptjs';
import { prisma } from '../app';
import {
  LoginCredentials,
  RegisterCredentials,
  JWTPayload,
  TokenPair,
  UserRole,
  AuthUser,
} from '../types/authTypes';
import { generateTokenPair } from '../utils/jwt';

export class AuthService {
  static async createUser(data: RegisterCredentials): Promise<AuthUser> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // 2. If storeId is provided, verify the store exists
      if (data.storeId) {
        const store = await prisma.store.findUnique({
          where: { id: data.storeId }
        });

        if (!store) {
          throw new Error('La tienda especificada no existe');
        }
      }

      // 3. Hashear contraseña
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // 4. Create user with store assignment (if provided) in a transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create the user
        const user = await tx.user.create({
          data: {
            email: data.email,
            passwordHash: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
          }
        });

        // If storeId is provided, create the UserStore relationship
        if (data.storeId) {
          await tx.userStore.create({
            data: {
              userId: user.id,
              storeId: data.storeId,
              role: data.role,
            }
          });
        }

        // Return the user with store relationships
        return await tx.user.findUnique({
          where: { id: user.id },
          include: {
            userStores: {
              include: {
                store: true
              }
            }
          }
        });
      });

      if (!result) {
        throw new Error('Error al crear el usuario');
      }

      // 5. Format and return user
      return {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        isActive: result.isActive,
        userStores: result.userStores.map(us => ({
          id: us.id,
          storeId: us.storeId,
          storeName: us.store.name,
          role: us.role as UserRole,
          isActive: us.isActive
        })),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      };

    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  }

  /**
   * LOGIN - Authenticate user
   */
  static async login(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: TokenPair }> {
    try {
      // 1. Find user with store relationships
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
        include: {
          userStores: {
            where: { isActive: true }, // Only active store relationships
            include: {
              store: true
            }
          }
        }
      });

      if (!user || !user.isActive) {
        throw new Error('Credenciales inválidas');
      }

      // 2. Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
      
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // 3. Create JWT payload with user stores
      const jwtPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userStores: user.userStores.map(us => ({
          storeId: us.storeId,
          storeName: us.store.name,
          role: us.role as UserRole,
          isActive: us.isActive
        }))
      };

      // 4. Generate tokens
      const tokens = generateTokenPair(jwtPayload);

      // 5. Format user response
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        userStores: user.userStores.map(us => ({
          id: us.id,
          storeId: us.storeId,
          storeName: us.store.name,
          role: us.role as UserRole,
          isActive: us.isActive
        })),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      return { user: authUser, tokens };

    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * ASSIGN USER TO STORE - Assign existing user to a store with a role
   */
  static async assignUserToStore(
    userId: string, 
    storeId: string, 
    role: UserRole
  ): Promise<void> {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Check if store exists
      const store = await prisma.store.findUnique({
        where: { id: storeId }
      });

      if (!store) {
        throw new Error('Tienda no encontrada');
      }

      // Check if relationship already exists
      const existingRelation = await prisma.userStore.findUnique({
        where: {
          userId_storeId: {
            userId,
            storeId
          }
        }
      });

      if (existingRelation) {
        throw new Error('El usuario ya está asignado a esta tienda');
      }

      // Create the relationship
      await prisma.userStore.create({
        data: {
          userId,
          storeId,
          role
        }
      });

    } catch (error) {
      console.error('Error asignando usuario a tienda:', error);
      throw error;
    }
  }
}