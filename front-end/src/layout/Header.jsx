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

export default function Header() {
  const { user, logout } = useAuth()
  const finalNav = user?.id ? userNav : guestNav

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

            {user?.id && (
              <li>
                <Link to='#' onClick={hdlLogout}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="header-bottom">
        <div className="in-header-bottom">
          <div className="in-header-bottom-center">
            {user?.role === 'user' && (
              <ul className=''>
                {finalNav.map(el => (
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
