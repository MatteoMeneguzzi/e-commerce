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
  useNavigate,
} from 'react-router-dom';
import Home from './routes/Home';
import Checkout from './routes/Checkout/Checkout';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import Layout from './components/Layout/Layout';
import { ProductDetail } from './routes/Product/ProductDetail';
import Login from './routes/Login/Login';

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
  const [errorMessage, setErrorMessage] = useState<string>();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

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
      console.log(err);
      setErrorMessage(err.data.error.message);
    }
  };

  useEffect(() => {
    let currentUser = localStorage.getItem('user');

    if (currentUser) {
      setIsLoading(true);
      fetchProducts();
      fetchCart();
      setIsLoading(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  console.log(order);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              totalItems={shoppingCart.total_items}
              setShowCart={setShowCart}
              user={user}
              setUser={setUser}
              order={order}
              setOrder={setOrder}
            />
          }
        >
          <Route
            index
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
            path='products/:productId'
            element={
              <ProductDetail
                products={products}
                handleAddToCart={handleAddToCart}
                showCart={showCart}
                setShowCart={setShowCart}
                setShoppingCart={setShoppingCart}
                shoppingCart={shoppingCart}
              />
            }
          />
          <Route
            path='checkout'
            element={
              <Checkout
                showCart={showCart}
                setShowCart={setShowCart}
                handleAddToCart={handleAddToCart}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                order={order}
                setOrder={setOrder}
                onCaptureCheckout={handleCaptureCheckout}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path='*'
            element={
              <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-16 px-8'>
                There's nothing here
              </h2>
            }
          />
        </Route>
        <Route
          path='/login'
          element={<Login user={user} setUser={setUser} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
