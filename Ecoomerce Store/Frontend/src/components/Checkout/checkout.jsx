import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useCart } from 'react-use-cart';

const stripePromise = loadStripe('pk_test_51QNG5tLqFwRemlIa2P67soeFy1YO0VwiZ75DIKQrT6wRQOXCmFMPsrhpEZDlDuLKZeruKvCi3niDrPCNiv3XG2vm004wILfoKF');

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productIds = location.state?.productIds || [];
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {emptyCart} = useCart();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      setLoading(false);
      return;
    }

    // Send product IDs to backend to create a payment intent
    const response = await fetch('http://localhost:8000/api/orders/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_ids: productIds }),
    });

    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      setError(backendError);
      setLoading(false);
      return;
    }

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setSuccess(true);
      alert('Payment Successful!');
      navigate('/order-success'); // Navigate to success page
      emptyCart();
      
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto',marginTop:'50px' }}>
      <h3>Checkout</h3>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: '20px', padding: '10px 20px' }}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>Payment Successful!</p>}
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
