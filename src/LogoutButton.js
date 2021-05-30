import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated && (
    <button variant="outline-success" onClick={logout}>Logout</button>
  );
}

export default LogoutButton;
