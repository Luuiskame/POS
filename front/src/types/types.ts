

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

export type userRole = "admin" | "manager" | "cashier" | "superadmin";


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
//* Usuario
export type User = {
  id: string;                // ID de usuario
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "manager" | "cashier" | "superadmin";
  isActive: boolean;   
  storeId: string;           // ID de la tienda
  createdAt: string;
  updatedAt: string;
  userStores?: Stores[];     // Lista de tiendas que el usuario tiene
  activeStore?: Stores | null;     // Tienda activo
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
  id: string;     // id that matches user-store relation
  storeId: string; // ID of the store
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  createdAt: string;        
  updatedAt: string;          
  role: userRole;
  userId : string;
};
