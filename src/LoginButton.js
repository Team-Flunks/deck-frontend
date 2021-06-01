import React from 'react';
import './css/Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import './css/Button.css';

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (
    <button className="button1" onClick={loginWithRedirect}>Log in</button>
  )
}

export default LoginButton;