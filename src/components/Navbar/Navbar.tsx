import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Cart, Menu } from '../../icons/Icons';

const links = [
  { id: '1', name: 'Dashboard', url: '' },
  { id: '2', name: 'Checkout', url: 'checkout' },
];

const Navbar = ({
  totalItems,
  setShowCart,
  setUser,
  order,
  setOrder,
}: {
  totalItems?: number | undefined;
  setShowCart?: (condition: boolean) => void;
  user?: User | undefined;
  setUser?: (user: User | undefined) => void;
  order?: CheckoutCaptureResponse | undefined;
  setOrder?: (order: CheckoutCaptureResponse | undefined) => void;
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');

    let currentUser = localStorage.getItem('user');

    if (!currentUser && setUser) {
      setUser(undefined);
      navigate('/login');
    }
  };

  return (
    <div className='relative mb-10'>
      <nav className='bg-gray-800 fixed top-0 right-0 left-0 z-10'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/* <!-- Mobile menu button--> */}
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
                onClick={() => {
                  setShowMenu(!showMenu);
                  // setShowProfile(false);
                }}
              >
                <span className='sr-only'>Open main menu</span>
                <Menu />
              </button>
            </div>
            {/* Logo */}
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <img
                  className='block lg:hidden h-10 w-auto'
                  src='img/logo.png'
                  alt='Workflow'
                />
                <img
                  className='hidden lg:block h-10 w-auto'
                  src='img/logo.png'
                  alt='Workflow'
                />
              </div>
              {/* NavLinks */}
              <div className='hidden sm:block sm:ml-6'>
                <div className='flex space-x-4'>
                  {links.map((link) => {
                    if (
                      order &&
                      location.pathname === '/checkout' &&
                      setOrder
                    ) {
                      return (
                        <NavLink
                          to={`/${link.url}`}
                          className={({ isActive }) =>
                            isActive
                              ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                              : 'bg-transparent text-white px-3 py-2 rounded-md text-sm font-medium'
                          }
                          key={link.id}
                          onClick={() => setOrder(undefined)}
                        >
                          {link.name}
                        </NavLink>
                      );
                    } else {
                      return (
                        <NavLink
                          to={`/${link.url}`}
                          className={({ isActive }) =>
                            isActive
                              ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                              : 'bg-transparent text-white px-3 py-2 rounded-md text-sm font-medium'
                          }
                          key={link.id}
                        >
                          {link.name}
                        </NavLink>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              {/* Cart Icon */}
              {setShowCart && (
                <button
                  type='button'
                  className='bg-gray-800 mb-2 rounded-full text-gray-400 hover:text-white px-2'
                  onClick={() => setShowCart(true)}
                >
                  <span className='sr-only'>View notifications</span>
                  <div className='bg-yellow-400 text-black w-3 rounded-md text-xs relative top-2 left-4'>
                    {totalItems}
                  </div>
                  <Cart />
                </button>
              )}

              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative'>
                <div>
                  <button
                    type='button'
                    className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => {
                      setShowProfile(!showProfile);
                      setShowMenu(false);
                    }}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>
                {/* <!--  Dropdown menu   --> */}
                <div
                  className={
                    showProfile
                      ? 'origin-top-right hover:origin-top absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                      : 'hidden'
                  }
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex={-1}
                >
                  {/* <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-0'
                  >
                    Your Profile
                  </a>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-1'
                  >
                    Settings
                  </a> */}
                  <button
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className={showMenu ? 'sm:hidden' : 'hidden'} id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {links.map((link) => (
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                }
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                key={link.id}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
