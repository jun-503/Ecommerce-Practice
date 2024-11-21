import { CartProvider } from 'react-use-cart';
import ProductDesc from '../Products/ProductDesc';
import Cart from './cart';

function CartContext() {
  return (
    
    <div className='container mt-5'>
      <Cart />
    </div>
    
  );
}

export default CartContext;
