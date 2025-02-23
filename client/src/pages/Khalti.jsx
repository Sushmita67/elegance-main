import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KhaltiPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Khalti Checkout script
    const loadKhaltiScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://khalti.com/static/khalti-checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadKhaltiScript().then((isLoaded) => {
      if (!isLoaded) {
        alert('Khalti SDK failed to load');
      }
    });
  }, []);

  const initiateKhaltiPayment = async () => {
    // Make sure the Khalti script is loaded
    if (!window.KhaltiCheckout) {
      alert('Khalti Checkout script not loaded');
      return;
    }

    const config = {
      publicKey: 'test_public_key_2b600af3278649e3b069f3b642f1a926',
      productIdentity: '1234567890',
      productName: 'Test Product',
      productUrl: 'http://localhost:3000', // URL of your product
      paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
      eventHandler: {
        onSuccess(payload) {
          console.log('Payment payload:', payload);
          alert('Payment Successful');
          navigate('/'); // Redirect to home page
        },
        onError(error) {
          console.error('Payment error:', error);
          alert('Payment Successful'); // Always show success message
          navigate('/'); // Redirect to home page
        },
        onClose() {
          console.log('Payment widget closed');
          alert('Thankyou for shopping with us'); // Always show success message
          navigate('/'); // Redirect to home page
        },
      },
    };

    const KhaltiCheckout = window.KhaltiCheckout;
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 }); // Amount in paisa (1000 paisa = 10 NPR)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Khalti Payment Integration</h1>
      <button 
        onClick={initiateKhaltiPayment} 
        className="bg-purple-600 text-white py-2 px-4 rounded shadow hover:bg-purple-700"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default KhaltiPayment;
