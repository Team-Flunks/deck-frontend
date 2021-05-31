import React from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import './Button.css';

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated && (
    <button className="button1" onClick={logout}>Logout</button>
  );
}

export default LogoutButton;
