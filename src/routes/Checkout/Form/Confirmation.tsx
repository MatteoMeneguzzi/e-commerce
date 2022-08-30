import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from '../../../icons/Icons';

const Confirmation = ({
  order,
}: {
  order: CheckoutCaptureResponse | undefined;
}) => {
  const [showModal, setshowModal] = useState<boolean>(false);
  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      {/* <!--
Background backdrop, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
--> */}
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          {/* <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  --> */}
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
                >
                  Go back to dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
