import React, { useState } from 'react';
import classes from './index.module.css';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const google = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const github = () => {
    window.open('http://localhost:5000/auth/github', '_self');
  };

  const login = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email,
          password,
        }),
      });
      props.setUser(response.data.user);
    } catch (error) {}
  };

  return (
    <div className={classes.loginContainer}>
      <h1 style={{ textAlign: 'center' }}>LogIn Form</h1>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <button onClick={google}>Continue With Google</button>
          {/* <button>Continue With Facebook</button> */}
          <button onClick={github}>Continue With Github</button>
        </div>
        <div className={classes.center}>
          <div className={classes.line} />
          <div className={classes.or}>OR</div>
        </div>
        <div className={classes.right}>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
