import { Cart } from '@chec/commerce.js/types/cart';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloseIcon } from '../../icons/Icons';
import ProductMiniature from '../Product/ProductMiniature';

const CartComponent = ({
  setShowCart,
  shoppingCart,
  setShoppingCart,
}: {
  setShowCart: (condition: boolean) => void;
  shoppingCart: Cart;
  setShoppingCart: (cart: Cart) => void;
}) => {
  let location = useLocation();

  console.log(location);

  return (
    <div>
      <div
        className='relative z-10'
        aria-labelledby='slide-over-title'
        role='dialog'
        aria-modal='true'
      >
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <div className='pointer-events-auto w-screen max-w-md'>
                <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                  <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
                    <div className='flex items-start justify-between'>
                      <h2
                        className='text-lg font-medium text-gray-900'
                        id='slide-over-title'
                      >
                        Shopping cart
                      </h2>
                      <div className='ml-3 flex h-7 items-center'>
                        <button
                          type='button'
                          className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                        >
                          <span className='sr-only'>Close panel</span>

                          <CloseIcon setShowCart={setShowCart} />
                        </button>
                      </div>
                    </div>

                    <div className='mt-8'>
                      <div className='flow-root'>
                        {shoppingCart.line_items !== undefined ? (
                          shoppingCart.line_items.length > 0 ? (
                            <ul className='my-6 divide-y divide-gray-200'>
                              {shoppingCart.line_items?.map((product) => (
                                <ProductMiniature
                                  product={product}
                                  key={product.id}
                                  setShoppingCart={setShoppingCart}
                                />
                              ))}
                            </ul>
                          ) : (
                            <div className='my-6 mx-2 divide-y divide-gray-200'>
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
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                    <div className='flex justify-between text-base font-medium text-gray-900'>
                      <p>Subtotal</p>
                      <p>{shoppingCart.subtotal?.formatted_with_symbol}</p>
                    </div>
                    <p className='mt-0.5 text-sm text-gray-500'>
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className='mt-6'>
                      <Link
                        to={
                          location.pathname === '/checkout' ? {} : '/checkout'
                        }
                        className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                        onClick={() => setShowCart(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                      <p>
                        or{' '}
                        <Link
                          to='/'
                          className='font-medium text-indigo-600 hover:text-indigo-500'
                          onClick={() => setShowCart(false)}
                        >
                          Continue Shopping
                          <span aria-hidden='true'> &rarr;</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
