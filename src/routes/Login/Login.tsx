import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components';
import SignInForm from './Form/SignInForm';

const Login = ({
  user,
  setUser,
}: {
  user: User | undefined;
  setUser: (user: User) => void;
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    let user: User = {
      username,
      password,
    };

    setUser({
      username,
      password,
    });

    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <SignInForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleUserLogin}
      />
    </div>
  );
};

export default Login;
