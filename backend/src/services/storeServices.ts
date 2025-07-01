// src/services/storeService.ts
import { prisma } from '../app';
import { UserRole, AuthUser } from '../types/authTypes';

export class StoreService {
  static async createStoreAndAssignAdmin(data: {
  storeName: string;
  storeAddress: string;
  storePhone?: string;
  storeEmail?: string;
  userId: string;
  role?: UserRole; 
}): Promise<{ store: any; user: AuthUser }> {
  const {
    storeName,
    storeAddress,
    storePhone,
    storeEmail,
    userId,
    role 
  } = data;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userStores: true,
    },
  });

  if (!existingUser) {
    throw new Error('El usuario no existe.');
  }

  if (existingUser.userStores.length > 0) {
    throw new Error('El usuario ya tiene un rol asignado en otra tienda.');
  }

  const result = await prisma.$transaction(async (tx) => {
    const store = await tx.store.create({
      data: {
        name: storeName,
        address: storeAddress,
        phone: storePhone,
        email: storeEmail,
      },
    });

    const userStore = await tx.userStore.create({
      data: {
        userId,
        storeId: store.id,
        role: role,
      },
    });

    return { store, userStore };
  });

  // Refresh user data
  const updatedUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userStores: {
        include: {
          store: true,
        },
      },
    },
  });

  if (!updatedUser) throw new Error('Error al recuperar el usuario actualizado.');

  const authUser: AuthUser = {
    id: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    isActive: updatedUser.isActive,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
    userStores: updatedUser.userStores.map((us) => ({
      id: us.id,
      storeId: us.storeId,
      storeName: us.store.name,
      role: us.role,
      isActive: us.isActive,
    })),
  };

  return { store: result.store, user: authUser };
}

static async assignUserToStore(data: {
    userId: string;
    storeId: string;
    role: UserRole;
  }): Promise<AuthUser> {
    const { userId, storeId, role } = data;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('El usuario no existe.');
    }

    // Check if the store exists
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new Error('La tienda no existe.');
    }

    // Check if user already has a role in this store
    const existingUserStore = await prisma.userStore.findFirst({
      where: {
        userId,
        storeId,
      },
    });

    if (existingUserStore) {
      throw new Error('El usuario ya tiene un rol en esta tienda.');
    }

    // Create the relation
    await prisma.userStore.create({
      data: {
        userId,
        storeId,
        role,
      },
    });

    // Return updated user
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userStores: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!updatedUser) {
      throw new Error('Error al recuperar el usuario actualizado.');
    }

    const authUser: AuthUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
      userStores: updatedUser.userStores.map((us) => ({
        id: us.id,
        storeId: us.storeId,
        storeName: us.store.name,
        role: us.role,
        isActive: us.isActive,
      })),
    };

    return authUser;
  }

}

