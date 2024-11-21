import { useEffect, useState } from 'react';

import { Row, Col, Container, Image, Form, Button } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useParams } from 'react-router-dom';


const ProductDesc = () => {
  const {id} = useParams()
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
  };
  
  const handleAddToCart = () => {
    if (product) {
      const parsedQuantity = parseInt(quantity, 10);
      if (parsedQuantity > 0) {
        addItem({ ...product, quantity: parsedQuantity });
        console.log(`Added ${parsedQuantity} of ${product.name} to cart.`);
      } else {
        alert('Quantity must be at least 1.');
      }
    }
  };


  
  

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/product/${id}/`, { signal });
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const reqRes = await response.json();
        setProduct(reqRes);
        
        
        
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An error occurred');
          console.error('Error fetching product:', err);
        }
      }
    };

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';
  return (
    
    <Container className="product-detail-container">
      <Row className="mt-5">
        <Col md={6} className="product-image-container">
          <Image src={apiUrl + product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <h5>Category: {product.category}</h5>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          {product.stock > 0 ? (
            
              <>
              <p className='text-success'>In Stock</p>
              <p>Available Quantity: {product.stock}</p>
              <Form.Group controlId="quantity" className="quantity-selector">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="add-to-cart-button mt-5"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              </>
              

            
          ) : (
            <p className='text-danger'>Out of Stock</p>
          )}
          

        </Col>
      </Row>
    </Container>
  );
};

export default ProductDesc;
