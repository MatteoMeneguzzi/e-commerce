import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';
import { CartComponent } from '../../components';
import Loader from '../../components/Loader/Loader';
import { Plus } from '../../icons/Icons';

export const ProductDetail = ({
  products,
  handleAddToCart,
  setShowCart,
  setShoppingCart,
  shoppingCart,
  showCart,
}: {
  products: Product[];
  handleAddToCart: (
    productId: string,
    quantity?: number | undefined
  ) => Promise<void>;
  setShowCart: (condition: boolean) => void;
  shoppingCart: Cart;
  setShoppingCart: (cart: Cart) => void;
  showCart: boolean;
}) => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product>();
  const [result, setResult] = useState('');

  useEffect(() => {
    let currentProduct = products.find((item) => item.id === productId);

    setProduct(currentProduct);

    if (product !== undefined) {
      let description = stripHtml(product.description);
      setResult(description.result);
    }
  }, [product, productId, products]);

  return (
    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-16'>
        Product Overview
      </h2>
      <h2 className='text-lg tracking-tight text-gray-900'>
        <Link to={'/'} className='font-semibold'>
          Products
        </Link>{' '}
        \ {product?.name}
      </h2>
      {product ? (
        <>
          <div className='group relative my-10'>
            <div className='h-80 w-60 bg-white-500 rounded-md overflow-hidden group-hover:opacity-75 mx-auto'>
              <img
                src={`${product?.assets[0].url}`}
                alt={product?.name}
                className='bg-cover z-0'
              />
            </div>
          </div>
          <div className='flex flex-col mx-auto max-w-lg'>
            <div className='flex justify-between mx-16 sm:mx-0 flex-1 mb-2'>
              <h3 className='text-sm text-gray-700'>{product?.name}</h3>
            </div>

            <div className='flex justify-between mx-16 sm:mx-0 flex-1'>
              <p className='mt-1 text-sm text-gray-500'>{result}</p>
            </div>

            <div className='flex justify-between mx-16 sm:mx-0 flex-1 mb-2 items-center'>
              <p className='text-sm font-medium text-gray-900'>
                Price: {product?.price.formatted_with_symbol}
              </p>
              {product && (
                <button onClick={() => handleAddToCart(product.id, 1)}>
                  <Plus />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loader type='Loading...' />
      )}
      <div className=' py-16'>
        <Link to='/'>
          <button className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Back
          </button>
        </Link>
      </div>
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
