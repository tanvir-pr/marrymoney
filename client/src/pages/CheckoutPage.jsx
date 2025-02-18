import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../providers/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK); // Use your Stripe public key

const CheckoutForm = ({ biodataId, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    const paymentData = {
      biodataId,
      selfEmail: userEmail,
      amount: 500, // Amount in cents for $5
    };

    try {
      setIsLoading(true);
      // Create a payment intent on the backend
      const paymentResponse = await axios.post('https://marrrrry.vercel.app/api/create-payment-intent', paymentData);
      const { clientSecret } = paymentResponse.data;

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: userEmail,
          },
        },
      });

      if (result.error) {
        setStripeError(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Payment success
        await axios.post('https://marrrrry.vercel.app/api/submit-contact-request', paymentData);
        alert('Payment successful! Your request has been submitted for verification.');
        navigate('/dashboard/contactRequest'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      setStripeError('An error occurred while processing your payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="biodataId" className="block text-sm font-medium text-gray-700">
          Biodata ID
        </label>
        <input
          type="text"
          id="biodataId"
          value={biodataId}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="selfEmail" className="block text-sm font-medium text-gray-700">
          Your Email
        </label>
        <input
          type="email"
          id="selfEmail"
          value={userEmail}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement
          id="card-element"
          className="p-2 border border-gray-300 rounded-md shadow-sm"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {stripeError && <p className="text-red-500 text-sm">{stripeError}</p>}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full py-2 px-4 text-white rounded-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {isLoading ? 'Processing...' : 'Submit Payment'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { biodataId } = useParams();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Checkout for Contact Information</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm biodataId={biodataId} userEmail={user.email} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
