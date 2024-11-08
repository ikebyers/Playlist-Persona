import { ChangeEvent, FormEvent, useState } from "react";
import { login } from '../src/api/authAPI';
import { UserLogin } from "../src/interfaces/UserLogin";
import Auth from '../src/utils/auth';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      console.log("this data" + data);
      Auth.login(data.token);
      navigate('/home');
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
  <div className="w-75 p-3 center">
    <div className='form-container form-container container-fluid mb-3'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='form-group form'>
          <input
            className='form-input form-control container-fluid'
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input form-control container-fluid'
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className='form-group'>
        <NavLink to="/home">
          <button className='rounded-pill btn btn-large' type='submit'>
            Login
          </button>
        </NavLink>
        <div className="text-center mt-5">
          <NavLink to="/" className="body-text-tertiary">
            Don't have an account yet? Create one here
          </NavLink>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;