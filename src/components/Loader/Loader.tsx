import React from 'react';
import { SpinnerLoader, SpinnerLoaderBig } from '../../icons/Icons';

const Loader = ({ type }: { type: string }) => {
  return (
    <>
      {type === 'Processing...' ? (
        <div className='flex justify-center absolute items-center top-0 bottom-0 left-0 w-full'>
          <button
            disabled
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <SpinnerLoader />
            {type}
          </button>
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <button disabled type='button'>
            <SpinnerLoaderBig />
          </button>
        </div>
      )}
    </>
  );
};

export default Loader;
