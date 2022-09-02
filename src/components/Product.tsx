import { Product } from '@chec/commerce.js/types/product';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';
import { Plus } from '../icons/Icons';

interface ProductProps {
  product: Product;
  handleAddToCart: (
    productId: string,
    quantity?: number | undefined
  ) => Promise<void>;
}

const ProductElement = ({ product, handleAddToCart }: ProductProps) => {
  const { result } = stripHtml(product.description);

  return (
    <div>
      <div className='group relative my-10'>
        <Link to={`/products/${product.id}`}>
          <div className='h-80 w-60 bg-white-500 rounded-md overflow-hidden group-hover:opacity-75 mx-auto'>
            <img
              src={`${product.assets[0].url}`}
              alt={product.name}
              className='bg-cover z-0'
            />
          </div>
        </Link>
      </div>
      <div className='max-h-16 flex flex-col '>
        <div className='flex justify-between mx-16 sm:mx-0 flex-1 mb-2'>
          <h3 className='text-sm text-gray-700'>{product.name}</h3>
          <p className='text-sm font-medium text-gray-900'>
            {product.price.formatted_with_symbol}
          </p>
        </div>

        <div className='flex justify-between mx-16 sm:mx-0 flex-1'>
          <p className='mt-1 text-sm text-gray-500 w-1/2 truncate'>{result}</p>
          <button onClick={() => handleAddToCart(product.id, 1)}>
            <Plus />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductElement;
