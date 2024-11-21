import { useCart } from 'react-use-cart';
import { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    isEmpty,
    items,
    cartTotal,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Clear cart when user logs out
  useEffect(() => {
    if (!currentUser) {
      emptyCart();
    }
    
  }, [currentUser, emptyCart]);

  const handleCheckout = () => {
    if (isEmpty) return alert('Cart is empty!');
    
    // Prepare product IDs for checkout
    const productIds = items.map((item) => item.id);
    
    // Navigate to checkout with product IDs
    navigate('/checkout', { state: { productIds } });
  };
  

  const handleEmptyCart = () => {
    if (window.confirm('Are you sure you want to empty the cart?')) {
      emptyCart();
    }
  };

  return (
    <div>
      <h1>Cart ({totalUniqueItems} unique items)</h1>
      <h2>Total: ${cartTotal.toFixed(2)}</h2>
      <ul>
        {isEmpty ? (
          <p>Your cart is empty</p>
        ) : (
          items.map((item) => (
            <li key={item.id} style={{ marginBottom: '1rem' }}>
              <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
              {item.name} - {item.quantity} x ${item.price}
              <div>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </li>
          ))
        )}
      </ul>
      {!isEmpty && (
        <>
          <button onClick={handleEmptyCart}>Empty Cart</button>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
