
import { CartProvider } from 'react-use-cart';
import ProductDesc from './ProductDesc';


import Cart from './cart';

function CartContext() {
    
  return (
    <CartProvider>
      
      <ProductDesc />
      <Cart />
    </CartProvider>
  );
}

export default CartContext;
