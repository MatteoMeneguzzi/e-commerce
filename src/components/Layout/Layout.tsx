import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = ({
  totalItems,
  setShowCart,
  showCart,
}: {
  totalItems: number | undefined;
  showCart: boolean;
  setShowCart: (condition: boolean) => void;
}) => {
  return (
    <>
      <Navbar totalItems={totalItems} setShowCart={setShowCart} />
      <Outlet />
    </>
  );
};

export default Layout;
