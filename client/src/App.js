import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      axios({
        url: '/auth/login/success',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) return setUser(response.data.user);
          throw new Error('authentication has been failed!');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const logOut = async () => {
    const response = await axios({
      url: '/auth/logout',
      method: 'GET',
    });
    if (response.data.success) {
      setUser(null);
    }
  };

  return (
    <React.Fragment>
      {user ? (
        <div
          style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>Logged In</p>
          <button
            onClick={logOut}
            style={{ padding: '7px 16px', cursor: 'pointer' }}
          >
            LogOut
          </button>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
      <Login setUser={setUser} />
    </React.Fragment>
  );
}

export default App;
