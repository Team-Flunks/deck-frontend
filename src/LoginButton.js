import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';


function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (
    <button onClick={() => loginWithRedirect()} class="log">LOG IN</button>
  )
}


export default LoginButton;