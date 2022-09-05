import { CartComponent } from '../../components';
import { Cart } from '@chec/commerce.js/types/cart';
import AddressForm from './Form/AddressForm';
import PaymentForm from './Form/PaymentForm';
import { useEffect, useState } from 'react';

import commerce from '../../lib/commerce';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Confirmation from './Form/Confirmation';
import CartEmpty from './Form/CartEmpty';

const Checkout = ({
  showCart,
  setShowCart,
  handleAddToCart,
  shoppingCart,
  setShoppingCart,
  order,
  setOrder,
  onCaptureCheckout,
  errorMessage,
  setErrorMessage,
}: {
  showCart: boolean;
  setShowCart: (condition: boolean) => void;
  handleAddToCart: (
    productId: string,
    quantity?: number | undefined
  ) => Promise<void>;
  shoppingCart: Cart;
  setShoppingCart: (cart: Cart) => void;
  order: CheckoutCaptureResponse | undefined;
  setOrder: (order: CheckoutCaptureResponse | undefined) => void;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => Promise<void>;
  errorMessage: string | undefined;
  setErrorMessage: (error: string) => void;
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
  const [shippingData, setShippingData] = useState<ShippingData>();
  const navigate = useNavigate();

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data: ShippingData) => {
    setShippingData(data);

    nextStep();
  };

  useEffect(() => {
    const generateCheckoutToken = async () => {
      try {
        let token: CheckoutToken | null = null;
        if (shoppingCart.line_items?.length && shoppingCart.id) {
          token = await commerce.checkout.generateToken(shoppingCart.id, {
            type: 'cart',
          });
        }
        if (token !== null) setCheckoutToken(token);
      } catch (error) {
        if (activeStep !== 2) navigate('/');
      }
    };
    generateCheckoutToken();
  }, [activeStep, navigate, shoppingCart.id, shoppingCart.line_items?.length]);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        next={next}
        activeStep={activeStep}
      />
    ) : activeStep === 1 && shippingData ? (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        activeStep={activeStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        onNext={nextStep}
        setShoppingCart={setShoppingCart}
      />
    ) : null;

  const ConfirmationElement = () =>
    order ? (
      <Confirmation
        order={order}
        setOrder={setOrder}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    ) : errorMessage ? (
      <Confirmation
        order={order}
        setOrder={setOrder}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    ) : (
      <Loader type='Processing...' />
    );

  console.log(order);

  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
      <div className='flex'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 pt-16'>
          Checkout
        </h2>
      </div>
      {activeStep === 2 ? <ConfirmationElement /> : <Form />}

      {showCart ? (
        <CartComponent
          setShowCart={setShowCart}
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
      ) : null}
    </div>
  );
};

export default Checkout;
