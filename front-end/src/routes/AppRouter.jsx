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
import ProductDetailsPage from '../layout/ProductDetailsPage';
import CartPage from '../layout/CartPage';
import PaymentPage from '../layout/PaymentPage';
import Footer from '../layout/footer';
import Order from '../layout/Order';

// สร้างเส้นทางสำหรับผู้ใช้ที่ยังไม่ล็อคอิน
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

// สร้างเส้นทางสำหรับผู้ใช้ที่ล็อคอินแล้ว
const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/howtopay', element: <HowToPayPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/userprofile', element: <UserProfile /> },
      { path: '/product/:id', element: <ProductDetailsPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/payment/:paymentId', element: <PaymentPage /> },
      { path: '/order', element: <Order /> },
    ],

  },
]);

// สร้างเส้นทางสำหรับผู้ดูแลระบบ (Admin)
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
  const { user } = useAuth();// ใช้ hook useAuth เพื่อตรวจสอบสถานะผู้ใช้
  // ตรวจสอบสถานะของผู้ใช้และเลือกเส้นทางที่เหมาะสม
  const finalRouter = user?.role === 'admin' ? adminRouter :  user ? userRouter : guestRouter;
  // ส่งเส้นทางที่เลือกไปยัง RouterProvider เพื่อให้ RouterProvider ใช้งานเส้นทางนั้น
  return <RouterProvider router={finalRouter} />;
}
