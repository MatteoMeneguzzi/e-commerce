import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check, ErrorIcon } from '../../../icons/Icons';

const Confirmation = ({
  order,
  setOrder,
  errorMessage,
  setErrorMessage,
}: {
  order: CheckoutCaptureResponse | undefined;
  setOrder: (order: CheckoutCaptureResponse | undefined) => void;
  errorMessage?: string | undefined;
  setErrorMessage: (error: string) => void;
}) => {
  // console.log(order);
  // console.log(errorMessage);

  const location = useLocation();

  console.log(location);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      {!errorMessage ? (
        <>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 flex items-center space-x-4 justify-center w-full'>
                      <h3
                        className='text-lg font-medium leading-6 text-gray-900'
                        id='modal-title'
                      >
                        Payment Successful
                      </h3>
                      <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10'>
                        <Check />
                      </div>
                    </div>
                  </div>
                  <div className='mt-2  sm:w-full flex flex-col items-center justify-center'>
                    <p className='text-sm text-gray-500 mb-2 w-32 sm:w-auto'>
                      Thank you for your purchase, {order?.customer.firstname}{' '}
                      {order?.customer.lastname}!
                    </p>
                    <p className='text-sm text-gray-500'>
                      Order ref: {order?.customer_reference}
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:justify-center sm:px-6'>
                  <Link to='/'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                      aria-current='page'
                      onClick={() => setOrder(undefined)}
                    >
                      Go back to dashboard
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : order?.status_fulfillment === 'not_fulfilled' ? (
        <>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='w-full flex justify-center'>
                    <div className='mx-auto'>
                      <ErrorIcon />
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-center flex-col'>
                  <h3
                    className='text-lg text-center font-medium leading-6 text-gray-900'
                    id='modal-title'
                  >
                    Payment not fulfilled
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-center text-gray-500 mx-10 mb-10'>
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:justify-center sm:px-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      navigate('/');
                      setErrorMessage('');
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='w-full flex justify-center'>
                    <div className='mx-auto'>
                      <ErrorIcon />
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-center flex-col'>
                  <h3
                    className='text-lg text-center font-medium leading-6 text-gray-900'
                    id='modal-title'
                  >
                    Payment not fulfilled
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-center text-gray-500 mx-10 mb-10'>
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:justify-center sm:px-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      navigate('/');
                      setErrorMessage('');
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Confirmation;
