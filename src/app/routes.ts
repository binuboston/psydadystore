import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Landing } from './pages/Landing';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        path: 'shop',
        Component: Shop,
      },
      {
        path: 'product/:slug',
        Component: ProductDetail,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'checkout',
        Component: Checkout,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
