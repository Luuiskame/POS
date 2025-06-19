import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { cartState, RootState } from "@/types/RootState";
import type { AddItemPayload, CartItem, RemoveItemPayload, UpdateQuantityPayload } from "@/types/types";


const calculateTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.subtotal, 0);
};

const saveCartToLocalStorage = (cartItems: CartItem[]): void => {
  const cartData = {
    cartItems,
    total: calculateTotal(cartItems),
  };
  localStorage.setItem("cartData", JSON.stringify(cartData));
};

const loadCartFromLocalStorage = (): { cartItems: CartItem[], total: number } | null => {
  const cartDataString = localStorage.getItem("cartData");
  return cartDataString ? JSON.parse(cartDataString) : null;
};


const initialState: cartState = {
  cartItems: [],
  total: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { product, quantity } = action.payload;
      
      // Validar stock disponible
      if (product.stock < quantity) {
        state.error = `No hay suficiente stock. Disponible: ${product.stock}`;
        return;
      }

      const subtotal = product.price * quantity;
      const existingItemIndex = state.cartItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Actualizar item existente
        const newQuantity = state.cartItems[existingItemIndex].quantity + quantity;
        
        // Verificar stock nuevamente
        if (product.stock < newQuantity) {
          state.error = `No puedes agregar más de ${product.stock} unidades`;
          return;
        }
        
        state.cartItems[existingItemIndex].quantity = newQuantity;
        state.cartItems[existingItemIndex].subtotal += subtotal;
      } else {
        // Agregar nuevo item
        state.cartItems.push({ product, quantity, subtotal });
      }

      state.total = calculateTotal(state.cartItems);
      state.error = null;
      saveCartToLocalStorage(state.cartItems);
    },

    removeItem: (state, action: PayloadAction<RemoveItemPayload>) => {
      const { itemId } = action.payload;
      state.cartItems = state.cartItems.filter(item => String(item.product.id) !== String(itemId));
      state.total = calculateTotal(state.cartItems);
      saveCartToLocalStorage(state.cartItems);
    },

    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { itemId, newQuantity } = action.payload;
      
      if (newQuantity <= 0) {
        state.error = "La cantidad debe ser mayor a cero";
        return;
      }

      const itemToUpdate = state.cartItems.find(item => String(item.product.id) === String(itemId));
      
      if (itemToUpdate) {
        // Validar stock
        if (itemToUpdate.product.stock < newQuantity) {
          state.error = `Solo hay ${itemToUpdate.product.stock} unidades disponibles`;
          return;
        }
        
        itemToUpdate.quantity = newQuantity;
        itemToUpdate.subtotal = itemToUpdate.product.price * newQuantity;
        state.total = calculateTotal(state.cartItems);
        state.error = null;
        saveCartToLocalStorage(state.cartItems);
      }
    },

    loadCart: (state) => {
      state.loading = true;
      const cartData = loadCartFromLocalStorage();
      
      if (cartData) {
        state.cartItems = cartData.cartItems;
        state.total = cartData.total;
      }
      
      state.loading = false;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      state.error = null;
      localStorage.removeItem("cartData");
    },

    clearError: (state) => {
      state.error = null;
    }
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  loadCart,
  clearCart,
  clearError
} = cartSlice.actions;

// Selectores
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) =>
  state.cart.cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0);
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;