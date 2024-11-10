import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { createUser } from "../src/api/userAPI";
import { UserData } from "../src/interfaces/UserData";
import auth from "../src/utils/auth";
import { NavLink, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
const CreateUser = () => {
  const [newUser, setNewUser] = useState<UserData | undefined>({
    id: null,
    uName: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  const createNewUser = async (body: UserData) => {
    try {
      const data = await createUser(body);
      return data;
    } catch (err) {
      console.error('Failed to create user', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (newUser) {
      const data = createNewUser(newUser);
      console.log(data);
      navigate('/');
    }
  }


  return (
    <div className="w-75 p-3 center">
      {loginCheck ? (
        <div>
          <h1 className="fw-bold">User already logged in</h1>
          <h3 className="body-text fst-italic">Navigate to the home page to create a playlist!</h3>
        </div>
      ) : ( 
        <div className="w-75 p-3 center">
          <div className="navbarNavAltMarkup">
            <h1 className="fw-bold">Create Account</h1>
          </div>
          <div className="form-container container-fluid mb-3">
            <form className='form' onSubmit={handleSubmit}>
              <input
                className="form-control container-fluid"
                type="text"
                name="uName"
                value={newUser?.uName ?? ''}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                className="form-control container-fluid"
                type="email"
                name="email"
                value={newUser?.email ?? ''}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                className="form-control container-fluid"
                type="text"
                name="username"
                value={newUser?.username ?? ''}
                onChange={handleChange}
                placeholder="Username"
              />
              <input
                className="form-control container-fluid"
                type="password"
                name="password"
                value={newUser?.password ?? ''}
                onChange={handleChange}
                placeholder="Password"
              />
              <button type="submit" className="rounded-pill btn btn-large">Create Account</button>
              <div className="text-center mt-5">
                <NavLink to="/" className="body-text-tertiary fst-italic">
                  Already have an account? Login here
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default CreateUser;