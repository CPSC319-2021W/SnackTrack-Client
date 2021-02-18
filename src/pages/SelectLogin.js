import { React, useEffect, useState } from 'react';
// import UserCard from '../components/UserCard';
import {getUserById} from '../services/UserService';

const SelectLogin = () => {
  // const dispatch = useDispatch();
  // // TODO: temporary, remove when making UserLoginList component 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserById(1);
      setUser(data);
    };
    getUser();
    console.log(user);
  });


  return (
    <div>
      <p>Login Page by selecting or searching a user</p>
      {/* <UserCard/> */}
    </div>
  );
};
export default SelectLogin;
