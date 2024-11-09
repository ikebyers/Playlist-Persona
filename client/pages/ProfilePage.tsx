import { useState, useEffect } from "react";
import { UserData } from "../src/interfaces/UserData";
import { retrieveUser, deleteUser } from "../src/api/userAPI";
import UserCard from "../src/components/UserCard";
import { useLocation } from "react-router-dom";
import { ApiMessage } from "../src/interfaces/ApiMessage";
import auth from "../src/utils/auth";

const ProfilePage = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      console.log("this is the " + JSON.stringify(auth.getProfile()));
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  const [user, setUser] = useState<UserData>();
  const [error, setError] = useState(false);
  const { state } = useLocation();
  console.log(state);

  const fetchUser = async (userId: number) => {
    try {
      const data = await retrieveUser(userId);
      setUser(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  }


  useEffect(() => {
    if (loginCheck) {
      const profile = auth.getProfile();
      if (profile && profile.id) { // Assuming profile contains the user ID
        fetchUser(profile.id);
      } else {
        console.error('No user ID found in profile');
        setError(true);
      }
    }
  }, [loginCheck]);

  const deleteIndvUser = async (userId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteUser(userId);
      fetchUser(state);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  if (error) {
    return (
      <section>
        <h1>404: Profile page is this</h1>
      </section>
    );
  }
  else {
    return (
      <div className='user-list'>
        {user ? (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            name={user.uName}
            email={user.email}
            deleteIndvUser={deleteIndvUser}
          />
        ) : (
          <div>
            <h1>
              Could not retrieve Users to display! Please Log In to view this page.
            </h1>
          </div>
        )
        }
      </div>
    );
  }
};

export default ProfilePage;