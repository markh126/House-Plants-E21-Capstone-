/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 className="welcome">Welcome to House Plants!</h1>
      <button type="button" className="sign-in-btn btn btn-lg copy-btn" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
