import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = ({
  totalItems,
  setShowCart,
  user,
  setUser,
  order,
  setOrder,
}: {
  totalItems: number | undefined;
  setShowCart: (condition: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  order: CheckoutCaptureResponse | undefined;
  setOrder: (order: CheckoutCaptureResponse | undefined) => void;
}) => {
  return (
    <>
      <Navbar
        totalItems={totalItems}
        setShowCart={setShowCart}
        user={user}
        setUser={setUser}
        order={order}
        setOrder={setOrder}
      />
      <Outlet />
    </>
  );
};

export default Layout;
