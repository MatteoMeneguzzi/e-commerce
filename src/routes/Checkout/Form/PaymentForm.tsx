import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeError,
} from '@stripe/stripe-js';
import { useState } from 'react';
import Review from '../Review';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'stripe public key not detected'
);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  activeStep,
  backStep,
  onCaptureCheckout,
  onNext,
  setShoppingCart,
}: {
  checkoutToken: CheckoutToken | undefined;
  shippingData: ShippingData;
  activeStep: number;
  backStep: () => void;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => Promise<void>;
  onNext: () => void;
  setShoppingCart?: (cart: Cart) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState<StripeError>();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!!,
    });

    if (error) {
      console.log('[error]', error);
      setErrorMessage(error);
    } else {
      const orderData = {
        line_items: checkoutToken?.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'International',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      if (checkoutToken) {
        onCaptureCheckout(checkoutToken.id, orderData);
      }

      onNext();
    }
  };

  return (
    <>
      <div className='py-8 max-w-xl flex flex-col mx-auto'>
        <Review
          checkoutToken={checkoutToken}
          setShoppingCart={setShoppingCart}
        />
        <div>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                  <CardElement className='p-10 pb-10 ml-2' />

                  <span
                    className={
                      errorMessage?.message
                        ? 'opacity-100 mx-12 p-3 bg-red-100 rounded-md  border border-width-1 border-red-300 text-gray-700'
                        : 'opacity-0 mx-12 p-3 rounded-md border border-width-1 border-red-300 text-gray-700 transition-opacity duration-300'
                    }
                  >
                    {errorMessage?.code === 'incorrect_number' &&
                      'Card number is not correct'}
                  </span>

                  <div className='flex justify-between flex-row px-12 mt-10'>
                    <button
                      className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={backStep}
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Pay
                    </button>
                  </div>
                </form>
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
