import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../src/api/userAPI";
import { UserData } from "../src/interfaces/UserData";
import { useNavigate } from "react-router-dom";


const CreateUser = () => {
  const [newUser, setNewUser] = useState<UserData | undefined>({
    id: null,
    uName: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

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
      navigate('/login');
    }
  }

  // return (
  //   <>
  //     <div className='form-container'>
  //       <form className='form' onSubmit=
  //         {handleSubmit}>
  //         <h1>Add New Volunteer</h1>
  //         <label>New Volunteer</label>
  //         <input
  //           type="text"
  //           name="volunteerName"
  //           value={newVolunteer?.volunteerName || ''}
  //           onChange={handleChange}
  //         />
  //         <button type='submit' onSubmit={handleSubmit}>Create</button>
  //       </form>
  //     </div>
  //   </>
  // );
  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="uName"
          value={newUser?.uName ?? ''}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={newUser?.email ?? ''}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="username"
          value={newUser?.username ?? ''}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={newUser?.password ?? ''}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}


export default CreateUser;