import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import React from 'react';
import ProductMiniature from '../../components/Product/ProductMiniature';
import commerce from '../../lib/commerce';

const Review = ({
  checkoutToken,
  setShoppingCart,
}: {
  checkoutToken: CheckoutToken | undefined;
  setShoppingCart?: (cart: Cart) => void;
}) => {
  return (
    <div>
      <h2 className='text-lg font-bold tracking-tight text-gray-900 py-8 p-6'>
        Checkout Review
      </h2>
      <div className='max-w-xl mx-auto'>
        {checkoutToken?.live.line_items.map((product) => (
          <ProductMiniature
            productReview={product}
            key={product.id}
            setShoppingCart={setShoppingCart}
          />
        ))}
        <div className='flex justify-end space-x-4 text-base font-medium text-gray-900 pt-8 pb-4 mx-6 border-b-2 border-gray-300'>
          <p>Subtotal:</p>
          <p>{checkoutToken?.live.subtotal.formatted_with_symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
