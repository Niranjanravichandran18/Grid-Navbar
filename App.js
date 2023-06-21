import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">AirData</span>
        <button className="btn-get-users" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Get Users'}
        </button>
      </nav>
      <div className="user-grid">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.email} className="avatar" />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
