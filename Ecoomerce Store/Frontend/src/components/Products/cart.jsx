
import { useCart } from 'react-use-cart';


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

  

  return (
    <div>
      <h1>Cart ({totalUniqueItems} items)</h1>
      <h2>Total: ${cartTotal}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
            <div>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {!isEmpty &&
        
        <button onClick={emptyCart}>Empty Cart</button>
      }
    </div>
  );
};

export default Cart;
