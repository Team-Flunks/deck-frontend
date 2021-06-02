import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './css/Login.css';
import './css/Button.css';

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated && (
    <button className="button1" onClick={logout}>Logout</button>
  );
}

export default LogoutButton;
