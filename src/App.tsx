import { useEffect, useState } from 'react';
import { Navbar } from './components/index';

import commerce from './lib/commerce';
import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import Home from './routes/Home';
import Checkout from './routes/Checkout/Checkout';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Cart>({
    created: 0,
    updated: 0,
    expires: 0,
    total_items: 0,
    total_unique_items: 0,
  });
  const [order, setOrder] = useState<CheckoutCaptureResponse>();
  const [errorMessage, setErrorMessage] = useState<Error>();

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();

      setProducts(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();

      setShoppingCart(cart);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleAddToCart = async (
    productId: string,
    quantity?: number | undefined
  ) => {
    try {
      const response = await commerce.cart.add(productId, quantity);

      setShoppingCart(response.cart);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const refreshCart = async () => {
    try {
      const newCart = await commerce.cart.refresh();
      setShoppingCart(newCart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (err: any) {
      // setErrorMessage(err.data.error.message);
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
    fetchCart();
    setIsLoading(false);
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar
          totalItems={shoppingCart.total_items}
          showCart={showCart}
          setShowCart={setShowCart}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                products={products}
                showCart={showCart}
                setShowCart={setShowCart}
                handleAddToCart={handleAddToCart}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />
            }
          />
          <Route
            path='/checkout'
            element={
              <Checkout
                showCart={showCart}
                setShowCart={setShowCart}
                handleAddToCart={handleAddToCart}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
        <Outlet />
      </Router>
    </div>
  );
}

export default App;
