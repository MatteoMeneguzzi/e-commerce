import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = ({
  setShowCart,
  setOrder,
}: {
  setShowCart: (condition: boolean) => void;
  setOrder: (order: CheckoutCaptureResponse | undefined) => void;
}) => {
  return (
    <div className='my-6 divide-y divide-gray-200'>
      The cart is empty.{' '}
      <Link
        to='/'
        className='font-medium text-indigo-600 hover:text-indigo-500'
        onClick={() => {
          setShowCart(false);
          setOrder(undefined);
        }}
      >
        Go Shopping
        <span aria-hidden='true'> &rarr;</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
