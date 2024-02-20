import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)

    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className="p-[10%] border w-6/6 min-w-[400px] max-w-[50%] max-h-[1069px] mx-auto  mt-[8%] text-center">
      <div className="text-3xl mb-5 justify-center">เข้าสู่ระบบ</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">ชื่อผู้ใช้ (username)</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-[682px] mx-auto ">
          <div className="label">
            <span className="label-text">รหัสผ่าน (password)</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full "
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>

        <div className='flex justify-end'>ไม่ต้องลืมหร่อกรหัส สมัครใหม่เอา</div>

        <div className="flex gap-5 justify-end">
          <button type="submit" className="btn btn-outline btn-info mt-7">Login</button>
        </div>
      </form>
    </div>
  );
}