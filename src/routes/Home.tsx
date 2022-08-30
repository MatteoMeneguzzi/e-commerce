import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';
import { CartComponent, Products } from '../components';

const Home = ({
  products,
  showCart,
  setShowCart,
  handleAddToCart,
  shoppingCart,
  setShoppingCart,
}: {
  products: Product[];
  showCart: boolean;
  setShowCart: (condition: boolean) => void;
  handleAddToCart: (
    productId: string,
    quantity?: number | undefined
  ) => Promise<void>;
  shoppingCart: Cart;
  setShoppingCart: (cart: Cart) => void;
}) => {
  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-16 px-8'>
        Our products
      </h2>
      {products.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Products products={products} handleAddToCart={handleAddToCart} />
      )}
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

export default Home;
