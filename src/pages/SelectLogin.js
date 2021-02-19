import { React, useEffect, useState } from 'react';
import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import { getUserById } from '../services/UserService';

const SelectLogin = () => {
  // // TODO: temporary, remove these calls when making UserLoginList component (SNAK-)
  const [loaded, isLoaded] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    isLoaded(typeof user !== 'undefined');
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserById(1);
      setUser(data);
    };
    getUser();
  }, []);


  let card = loaded ? <UserCard user={user}/> : <UserCardSkeleton/>;

  return (
    <div>
      <p>Login Page by selecting or searching a user</p>
      {card}
    </div>
  );
};
export default SelectLogin;
