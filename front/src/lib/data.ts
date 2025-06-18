import type { Product, User } from "@/types/types";

export const products: Product[] = [
  {
    id: "a1b2c3d4-e5f6-7890",
    name: "Laptop HP Pavilion",
    category: "Electrónicos",
    price: 899.99,
    stock: 15,
    barcode: "123456789012",
    description: "Laptop con procesador Intel i5 y 8GB de RAM"
  },
  {
    id: "b2c3d4e5-f6g7-8901",
    name: "Smartphone Samsung Galaxy S21",
    category: "Electrónicos",
    price: 799.50,
    stock: 25,
    barcode: "234567890123"
  },
  {
    id: "c3d4e5f6-g7h8-9012",
    name: "Auriculares Sony WH-1000XM4",
    category: "Electrónicos",
    price: 349.99,
    stock: 30
  },
  {
    id: "d4e5f6g7-h8i9-0123",
    name: "Camisa de algodón",
    category: "Ropa",
    price: 29.99,
    stock: 50,
    barcode: "345678901234"
  },
  {
    id: "e5f6g7h8-i9j0-1234",
    name: "Zapatillas Nike Air Max",
    category: "Calzado",
    price: 129.95,
    stock: 20,
    description: "Zapatillas deportivas con amortiguación Air"
  },
  {
    id: "f6g7h8i9-j0k1-2345",
    name: "Libro 'Cien años de soledad'",
    category: "Libros",
    price: 15.99,
    stock: 40,
    barcode: "456789012345"
  },
  {
    id: "g7h8i9j0-k1l2-3456",
    name: "Cafetera Nespresso",
    category: "Electrodomésticos",
    price: 119.00,
    stock: 12
  },
  {
    id: "h8i9j0k1-l2m3-4567",
    name: "Mochila para laptop",
    category: "Accesorios",
    price: 45.50,
    stock: 35,
    barcode: "567890123456"
  },
  {
    id: "i9j0k1l2-m3n4-5678",
    name: "Reloj inteligente Xiaomi Mi Band 6",
    category: "Electrónicos",
    price: 59.99,
    stock: 28
  },
  {
    id: "j0k1l2m3-n4o5-6789",
    name: "Juego de sábanas de algodón",
    category: "Hogar",
    price: 39.95,
    stock: 18,
    description: "Juego de sábanas 100% algodón, tamaño queen"
  },
  {
    id: "k1l2m3n4-o5p6-7890",
    name: "Teclado mecánico RGB",
    category: "Electrónicos",
    price: 89.99,
    stock: 22,
    barcode: "678901234567"
  },
  {
    id: "l2m3n4o5-p6q7-8901",
    name: "Botella de agua termica",
    category: "Accesorios",
    price: 24.99,
    stock: 40
  },
  {
    id: "m3n4o5p6-q7r8-9012",
    name: "Pack de 6 cervezas artesanales",
    category: "Bebidas",
    price: 19.99,
    stock: 15,
    barcode: "789012345678"
  },
  {
    id: "n4o5p6q7-r8s9-0123",
    name: "Cepillo de dientes eléctrico",
    category: "Cuidado personal",
    price: 49.95,
    stock: 30
  },
  {
    id: "o5p6q7r8-s9t0-1234",
    name: "Mesa de centro moderna",
    category: "Muebles",
    price: 199.00,
    stock: 8,
    description: "Mesa de centro de madera con diseño contemporáneo"
  }
];


export const users: User[] = [
  {
    id: "u1a2b3c4-d5e6-7890",
    name: "María González",
    role: "admin",
    email: "maria.gonzalez@tienda.com",
    password: "AdminSecure123!"
  },
  {
    id: "v2b3c4d5-e6f7-8901",
    name: "Carlos Mendoza",
    role: "seller",
    email: "carlos.mendoza@tienda.com",
    password: "Vendedor456$"
  }
];