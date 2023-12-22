"use client";

import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return (Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();
    
    if (isFormValid) {
      let formData = {
        email,
        password,
        redirect: false
      };
      const response = await signIn('credentials', formData);
      if(!response.error){
        router.push('/');
        router.refresh();
      }
      else {
        let errors = {};
        errors.password = "The email or the password is invalid. Please try again.";
        setErrors(errors);
      }
    }
  };

  return (
    <div className="account_container">
      <div className="icon_container">
        <i className="fa-solid fa-user"></i>
      </div>
      <h1>Login</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="form_error">{errors.email}</span>}
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="form_error">{errors.password}</span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="providers_container">
        <span className="seperator">
          <div></div>
          <h4>OR</h4>
        </span>
        <button onClick={() => {signIn('google')}}>
          <Image 
            src={'/media/png/google-logo-9808.png'}
            height={40}
            width={40}
            alt="Google Logo"
          />
          Log In with Google
        </button>
        <button onClick={() => {signIn('github')}}>
          <Image 
            src={'/media/png/github-mark-white.png'}
            height={40}
            width={40}
            alt="Github Logo"
          />
          Log In with GitHub
        </button>
      </div>
    </div>
  );
}
