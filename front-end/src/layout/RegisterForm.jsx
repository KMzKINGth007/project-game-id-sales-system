import axios from 'axios'
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    line: '',
    facebook: ''
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
      }
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className="p-[10%] border w-6/6 min-w-[400px] max-w-[50%] max-h-[1069px] mx-auto  mt-[5%] text-center">
      <div className="text-3xl mb-5 justify-center">สร้างบัญชี</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Line</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="line"
            value={input.line}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Facebook</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="facebook"
            value={input.facebook}
            onChange={hdlChange}
          />
        </label>


        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-5 justify-end">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
