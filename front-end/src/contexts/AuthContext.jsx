import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem('token');
        if (!token) return;
        const rs = await axios.get('http://localhost:8889/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(rs.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      console.log('HI ADMIN');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
