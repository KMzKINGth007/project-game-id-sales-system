import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
]

const userNav = [
  { to: '/', text: 'หน้าแรก' },
  { to: '/shop', text: 'ร้านค้า' },
  { to: '/howtopay', text: 'วิธีการชำระ' },
  { to: '/contact', text: 'ติดต่อเรา' },
]

const userMenu = [
  { to: '/userprofile', text: 'โปรไฟล์' },
]

const adminNav = [
  { to: '/', text: 'หน้าจัดการสินค้า' },
  { to: '/useredit', text: 'หน้าจัดการผู้ใช้' }
]

export default function Header() {
  const { user, logout } = useAuth()



  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="header min-w-[400px]">
      <div className='header-main'>
        <div className="header-search navbar-start">
          <a className="">Hello, {user?.id ? user.username : 'Guest'}</a>
          {user?.id && (
            <div >
              <input type="text" placeholder="Search..." />
            </div>
          )}
        </div>
        <div className="header-logo navbar-center">
          <a className="">LOGO</a>
        </div>
        <div className="header-menu navbar-end ">
          <ul className="text-end">
            {user?.id ? null : (
              guestNav.map(el => (
                <li key={el.to} >
                  <Link to={el.to}>{el.text}</Link>
                </li>
              ))
            )}
            {user?.id && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  {userMenu.map(el => (
                    <li key={el.to} >
                      <Link to={el.to}>{el.text}</Link>
                    </li>
                  ))}
                  <li><a>Settings</a></li>
                  <li>
                    <Link to='#' onClick={hdlLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="header-bottom">
        <div className="in-header-bottom">
          <div className="in-header-bottom-center">
            {user?.role === 'user' && (
              <ul className=''>
                {userNav.map(el => (
                  <li key={el.to} >
                    <Link to={el.to}>{el.text}</Link>
                  </li>
                ))}
              </ul>
            )}
            {user?.role === 'admin' && (
              <ul className=''>

                  {adminNav.map(el => (
                    <li key={el.to} >
                      <Link to={el.to}>{el.text}</Link>
                    </li>
                  ))}
          
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
