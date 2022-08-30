import { Product } from '@chec/commerce.js/types/product';
import React from 'react';
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
      <div className='group relative mt-10'>
        <div className='h-80 w-60 bg-white-500 rounded-md overflow-hidden group-hover:opacity-75 mx-auto'>
          <img
            src={`${product.assets[1].url}`}
            alt={product.name}
            className='bg-cover'
          />
        </div>
      </div>
      <div className='flex justify-between mx-16 sm:mx-0'>
        <h3 className='text-sm text-gray-700'>{product.name}</h3>
        <p className='text-sm font-medium text-gray-900'>
          {product.price.formatted_with_symbol}
        </p>
      </div>
      <div className='flex justify-between mx-16 sm:mx-0'>
        <p className='mt-1 text-sm text-gray-500'>{result}</p>
        <button className='' onClick={() => handleAddToCart(product.id, 1)}>
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default ProductElement;
