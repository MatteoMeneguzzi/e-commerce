import { Product } from '@chec/commerce.js/types/product';
import ProductElement from './Product';

const Products = ({
  products,
  handleAddToCart,
}: {
  products: Product[];
  handleAddToCart: (
    productId: string,
    quantity?: number | undefined
  ) => Promise<void>;
}) => {
  return (
    <main>
      <div className='bg-white'>
        <div className='max-w-2xl mx-auto lg:max-w-7xl'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 sm:gap-x-20 lg:grid-cols-3 xl:gap-x-8 mb-20'>
            {products.map((product) => (
              <ProductElement
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
