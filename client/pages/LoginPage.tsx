import { ChangeEvent, FormEvent, useState } from "react";
import { login } from '../src/api/authAPI';
import { UserLogin } from "../src/interfaces/UserLogin";
import Auth from '../src/utils/auth';
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password');
    }
  };

  return (
  <div className="w-75 p-3 center">
    <div className='form-container form-container container-fluid mb-3'>
      <form className='form login-form' onSubmit={handleSubmit}>

        {error && <p className="error">{error}</p>}

        <h1 className="fw-bold">Login</h1>
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
          <button className='rounded-pill btn btn-large' type='submit'>
            Login
          </button>
        <div className="text-center mt-5">
          <NavLink to="/createAccount" className="body-text-tertiary fst-italic">
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