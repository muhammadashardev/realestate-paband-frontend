import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating payment intent...');

    const res = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000, currency: 'usd' }),
    });

    const data = await res.json();
    if (data.error) { setStatus(data.error); return; }

    const { clientSecret } = data;
    setStatus('Confirming card payment...');

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setStatus(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      setStatus('Payment succeeded');
    } else {
      setStatus('Unexpected payment status');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded">
        <CardElement />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!stripe}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Pay $50
        </button>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
    </form>
  );
}
