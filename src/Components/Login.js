import React from 'react';
import "./Login.css";
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';

function Login() {
  const [ , dispatch ] = useStateValue();
  const GoogleSignIn = () => {
    auth.signInWithPopup(provider).then(result=>{
      console.log(result);
      dispatch({
        type: 'SET_USER',
        user: result.user,
      })
    }).catch(error=>console.log(error))
  };
  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt='whatsapp' />
      </div>
      <div className="login-sign">
        <h3>Sign in to WhatsApp</h3>
      </div>
      <button onClick={GoogleSignIn}>Sign on With Google</button>
    </div>
  )
}

export default Login;
