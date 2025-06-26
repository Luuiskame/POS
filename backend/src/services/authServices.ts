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

export class AuthService {
  
  static async registerStore(storeData: {
    storeName: string;
    storeAddress: string;
    storePhone?: string;
    storeEmail?: string;
    // Usuario admin de la tienda
    userEmail: string;
    userPassword: string;
    userFirstName: string;
    userLastName: string;
  }): Promise<{ store: any; user: AuthUser }> {
    
    try {
      // 1. Verificar que el email no exista
      const existingUser = await prisma.user.findUnique({
        where: { email: storeData.userEmail }
      });

      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // 2. Hashear contraseña
      const hashedPassword = await bcrypt.hash(storeData.userPassword, 12);

      // 3. Crear tienda Y usuario admin en una transacción
      const result = await prisma.$transaction(async (tx) => {
        // Crear la tienda
        const store = await tx.store.create({
          data: {
            name: storeData.storeName,
            address: storeData.storeAddress,
            phone: storeData.storePhone,
            email: storeData.storeEmail
          }
        });

        // Crear usuario admin para esa tienda
        const user = await tx.user.create({
          data: {
            email: storeData.userEmail,
            passwordHash: hashedPassword, 
            firstName: storeData.userFirstName,
            lastName: storeData.userLastName,
            role: 'admin', 
            storeId: store.id
          },
          include: {
            store: true
          }
        });

        return { store, user };
      });

      // 4. Formatear respuesta
      const authUser: AuthUser = {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role,
        storeId: result.user.storeId,
        store: result.user.store.name,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt
      };

      return { store: result.store, user: authUser };

    } catch (error) {
      console.error('Error registrando tienda:', error);
      throw error;
    }
  }


  // associate existing user with existing store
  static async associateUserToStore(userId: string, storeId: string): Promise<AuthUser> {
  try {
    // 1. Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('El usuario no existe');
    }

    // 2. Verificar que la tienda existe
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    });

    if (!store) {
      throw new Error('La tienda no existe');
    }

    // 3. Asociar usuario a la tienda
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        storeId: storeId
      },
      include: {
        store: true
      }
    });

    // 4. Formatear y retornar usuario
    const authUser: AuthUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
      storeId: updatedUser.storeId,
      store: updatedUser.store?.name,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    return authUser;

  } catch (error) {
    console.error('Error asociando usuario a tienda:', error);
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

  /**
   * 3. LOGIN - Autenticar usuario
   */
  static async login(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: TokenPair }> {
    try {
      // 1. Buscar usuario
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
        include: { store: true }
      });

      if (!user || !user.isActive) {
        throw new Error('Credenciales inválidas');
      }

      // 2. Verificar contraseña
      const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
      
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      // 3. Crear payload para JWT
      const jwtPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        storeId: user.storeId
      };

      // 4. Generar tokens
      const tokens = generateTokenPair(jwtPayload);

      // 5. Usuario formateado
      const authUser: AuthUser = {
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

      return { user: authUser, tokens };

    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * 4. REFRESCAR TOKENS
   */
  static async refreshTokens(userId: string): Promise<{ user: AuthUser; tokens: TokenPair }> {
    try {
      // 1. Buscar usuario actual
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { store: true }
      });

      if (!user || !user.isActive) {
        throw new Error('Usuario no válido');
      }

      // 2. Crear nuevo payload
      const jwtPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        storeId: user.storeId
      };

      // 3. Generar nuevos tokens
      const tokens = generateTokenPair(jwtPayload);

      // 4. Usuario formateado
      const authUser: AuthUser = {
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

      return { user: authUser, tokens };

    } catch (error) {
      console.error('Error refrescando tokens:', error);
      throw error;
    }
  }
}