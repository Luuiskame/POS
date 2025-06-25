import type { Product, User, Stores } from "@/types/types";

// Productos con códigos de barras
export const productos : Product[] = [
  { id: 1
    , name: "Coca Cola 600ml", price: 2.5, category: "Bebidas", stock: 50, barcode: "7501055363057" },
  { id: 2, name: "Pan Integral", price: 1.8, category: "Panadería", stock: 25, barcode: "7501030485963" },
  { id: 3, name: "Leche Entera 1L", price: 3.2, category: "Lácteos", stock: 30, barcode: "7501055320456" },
  { id: 4, name: "Arroz 1kg", price: 4.5, category: "Granos", stock: 40, barcode: "7501030485741" },
  { id: 5, name: "Pollo Entero", price: 8.9, category: "Carnes", stock: 15, barcode: "2001234567890" },
  { id: 6, name: "Manzanas 1kg", price: 3.8, category: "Frutas", stock: 20, barcode: "4011200296906" },
  { id: 7, name: "Detergente", price: 6.75, category: "Limpieza", stock: 18, barcode: "7501055320789" },
  { id: 8, name: "Café Molido", price: 5.4, category: "Bebidas", stock: 22, barcode: "7501055363125" },
  { id: 9, name: "Huevos x12", price: 4.2, category: "Lácteos", stock: 35, barcode: "7501030485852" },
  { id: 10, name: "Aceite Vegetal", price: 7.3, category: "Aceites", stock: 12, barcode: "7501055320963" },
]


export const users: User[] = [
  {
    id: "u1a2b3c4-d5e6-7890",
    name: "María González",
    role: "admin",
    email: "maria.gonzalez@tienda.com",
    password: "AdminSecure123!", 
    storeId: "s1a2b3c4-d5e6-7890", 
    createdAt: "2025-06-16",
    updatedAt: "2025-06-16",
    isActive: false
  },
  {
    id: "v2b3c4d5-e6f7-8901",
    name: "Carlos Mendoza",
    role: "manager",
    email: "carlos.mendoza@tienda.com",
    password: "Vendedor456$",
    storeId: "s1a2b3c4-d5e6-7890", 
    createdAt: "2025-17-16",
    updatedAt: "2025-17-16",
    isActive: false
  },
  {
    id: "c2b3c4d5-e6f7-8901",
    name: "Juan Perez",
    role: "cashier",
    email: "juan.perez@tienda.com",
    password: "Vendedor456$",
    storeId: "s1a2b3c4-d5e6-7890", 
    createdAt: "2025-17-16",
    updatedAt: "2025-17-16",
    isActive: false
  }
];


export const store : Stores[] = [
  {
    id: "s1a2b3c4-d5e6-7890",
    name: "Tienda de Juan Perez",
    address: "Calle de Juan Perez, 123",
    phone: "123456789",
    email: "juan.perez@tienda.com",
    createdAt: "2025-06-16",
    updatedAt: "2025-06-16",
  },
  {
    id: "s2b3c4d5-e6f7-8901",
    name: "Tienda de Carlos Mendoza",
    address: "Calle de Carlos Mendoza, 123",
    phone: "123456789",
    email: "carlos.mendoza@tienda.com",
    createdAt: "2025-06-16",
    updatedAt: "2025-06-16",
  }
];