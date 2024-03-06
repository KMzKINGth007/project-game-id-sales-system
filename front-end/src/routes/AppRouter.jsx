import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from '../layout/LoginForm';
import RegisterForm from '../layout/RegisterForm';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import AdminHome from '../layout/AdminHome';
import UserHome from '../layout/UserHome';
import ShopPage from '../layout/ShopPage';
import HowToPayPage from '../layout/HowToPayPage';
import ContactPage from '../layout/contactPage';
import AdminUserEdit from '../layout/AminUserEdit';
import UserProfile from '../layout/UserProfile';


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/howtopay', element: <HowToPayPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/userprofile', element: <UserProfile /> },
    ],
    
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: '/useredit', element: <AdminUserEdit /> },
  ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.role === 'admin' ? adminRouter : user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
