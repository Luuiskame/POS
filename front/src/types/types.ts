

//* Producto
export type Product = {
  id: number;              // UUID o string único
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;        // opcional
  description?: string;
};




//* Carrito
export type CartItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

export type CartState = {
  cartItems: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
};

// Tipos para los payloads de las acciones
export type AddItemPayload = {
  product: Product;
  quantity: number;
};

export type UpdateQuantityPayload = {
  itemId: string;
  newQuantity: number;
};

export type RemoveItemPayload = {
  itemId: string;
};




//* Venta
export type Sale = {
  id: string;
  date: string;              
  userId: string;            // ID del vendedor
  clientId?: string;         // opcional, si hay cliente frecuente
  items: CartItem[];
  total: number;
  paymentMethod: "cash" | "card" | "mp" | "transfer";
};






//* Usuario
export type User = {
id: string;                // UUID o string único
  email: string;           // único
  password: string;        // hash
  name: string;
  role: "admin" | "manager" | "cashier";
  isActive: boolean;
  storeId: string;         // ID de la tienda
  createdAt: string;       // fecha de creación
  updatedAt: string;       // fecha de actualización
};



//* Cliente
export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};




//*stores
export type Stores = {
  id: string;               // UUID o string único
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;        
  updatedAt: string;        
};