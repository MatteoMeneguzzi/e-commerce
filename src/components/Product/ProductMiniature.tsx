import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutTokenLineItem } from '@chec/commerce.js/types/checkout-token';
import { LineItem } from '@chec/commerce.js/types/line-item';

import commerce from '../../lib/commerce';

const ProductMiniature = ({
  product,
  productReview,
  setShoppingCart,
}: {
  product?: LineItem;
  productReview?: CheckoutTokenLineItem;
  setShoppingCart?: (cart: Cart) => void;
}) => {
  const handleUpdateCartQty = async (sign: string) => {
    if (product && setShoppingCart) {
      if (sign === '-') {
        try {
          const response = await commerce.cart.update(product.id, {
            quantity: product.quantity - 1,
          });

          setShoppingCart(response.cart);
        } catch (error) {
          throw new Error(`OOOps error: ${error}`);
        }
      } else if (sign === '+') {
        try {
          const response = await commerce.cart.update(product.id, {
            quantity: product.quantity + 1,
          });

          setShoppingCart(response.cart);
        } catch (error) {
          throw new Error(`OOOps error: ${error}`);
        }
      }
    }
  };

  const removeProduct = async () => {
    if (product && setShoppingCart)
      try {
        const response = await commerce.cart.remove(product.id);

        setShoppingCart(response.cart);
      } catch (error) {
        throw new Error(`OOOps error: ${error}`);
      }
  };

  return (
    <>
      {product && (
        <li className='flex py-6' key={product?.id}>
          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
            <img
              src={`${product?.image?.url}`}
              alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='ml-4 flex flex-1 flex-col'>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <h3>{product?.name}</h3>
                <p className='ml-4'>
                  {product?.line_total.formatted_with_symbol}
                </p>
              </div>
            </div>
            <div className='flex flex-1 items-end justify-between text-sm'>
              <p className='text-gray-500 flex space-x-2 items-center'>
                <span>Qty:</span>
                <button
                  className='text-gray-500 text-2xl mb-0.5 active:text-yellow-500'
                  onClick={() => handleUpdateCartQty('-')}
                >
                  -
                </button>
                <span className='text-gray-900 text-base'>
                  {product?.quantity}
                </span>
                <button
                  className='text-gray-500 text-xl active:text-yellow-500'
                  onClick={() => handleUpdateCartQty('+')}
                >
                  +
                </button>
              </p>
              <div className='flex'>
                <button
                  type='button'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                  onClick={removeProduct}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      )}

      {productReview && (
        <li className='flex p-6' key={productReview?.id}>
          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
            <img
              src={`${productReview?.image?.url}`}
              alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='ml-4 flex flex-1 flex-col'>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <h3>
                  <a href='#'> {productReview?.name} </a>
                </h3>
                <p className='ml-4'>
                  {productReview?.line_total.formatted_with_symbol}
                </p>
              </div>
            </div>
            <div className='flex flex-1 items-end justify-between text-sm'>
              <p className='text-gray-500 flex space-x-2 items-center'>
                <span>Qty:</span>

                <span className='text-gray-900 text-base'>
                  {productReview?.quantity}
                </span>
              </p>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ProductMiniature;
