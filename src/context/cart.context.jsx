import { createContext, useState ,useEffect} from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}; 

const removeCartItem=(cartItem,cartItemToRemove)=>{ 
  //find the cart item to remove 
  const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check is quantity is equal to one ,if it is then remove form the cart 
 if(existingCartItem.quantity ===1){
  return cartItem.filter(cartItem => cartItem.id !== cartItemToRemove.id)
 }
 
 return cartItem.map((cartItem) =>
 cartItem.id === cartItemToRemove.id
   ? { ...cartItem, quantity: cartItem.quantity - 1 }
   : cartItem
);
}
 
const clearCartItem=(cartItem,cartItemToClear)=>( cartItem.filter(cartItem => cartItem.id !== cartItemToClear.id))



export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},  
  removeItemToCart:()=>{}, 
  clearItemFromCart:()=>{},
  cartCount:0, 
  total:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount,setCartCount]=useState(0);  
  const [cartTotal,setCartTotal]=useState(0);
 
  useEffect(()=>{ 
    const newCartCount=cartItems.reduce((total,cartItem)=>total +cartItem.quantity,0)
     setCartCount(newCartCount);
  },[cartItems])
  useEffect(()=>{ 
    const newTotal=cartItems.reduce((total,cartItem)=>total +cartItem.quantity  * cartItem.price,0)
     setCartTotal(newTotal);
  },[cartItems])

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemToCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart ,cartCount,removeItemToCart,clearItemFromCart,cartTotal};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};