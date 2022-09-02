import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = ({
  setShowCart,
}: {
  setShowCart: (condition: boolean) => void;
}) => {
  return (
    <div className='my-6 divide-y divide-gray-200'>
      The cart is empty.{' '}
      <Link
        to='/'
        className='font-medium text-indigo-600 hover:text-indigo-500'
        onClick={() => setShowCart(false)}
      >
        Go Shopping
        <span aria-hidden='true'> &rarr;</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
