export type Product = {
  id: string;              // UUID o string único
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode?: string;        // opcional
  description?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  subtotal: number; // producto.price * quantity
};


export type Sale = {
  id: string;
  date: string;              
  userId: string;            // ID del vendedor
  clientId?: string;         // opcional, si hay cliente frecuente
  items: CartItem[];
  total: number;
  paymentMethod: "cash" | "card" | "mp" | "transfer";
};


export type User = {
  id: string;
  name: string;
  role: "admin" | "seller";
  email: string;
  password: string;  
};


export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};