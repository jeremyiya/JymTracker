"use client";

import Image from 'next/image'
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Form() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    let errors = {};
    if (!first_name) {
      errors.first_name = "Please enter your first name";
    }
    if (!last_name) {
      errors.last_name = "Please enter your last name";
    }
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (
      password.search(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$`
      ) === -1
    ) {
      errors.password =
        "The password must contain one uppercase letter, one lowercase letter, one number, one special character and be a minimum of 8 characters";
    }
    if (password != cpassword) {
      errors.cpassword = "The confirm password must match the password";
    }

    setErrors(errors);
    return (Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();
    
    if (isFormValid) {
      let formData = {
        first_name,
        last_name,
        email,
        password
      };
      fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      })
      .then((response) => {return response.json()})
      .then((data) => {
        if(data.message) {
          router.push('/login');
          router.refresh();
        }
        else {
          let errors = {};
          if(data.error.includes("email")){
            errors.email = data.error;
          }
          else{
            errors.cpassword = data.error;
          }
          setErrors(errors);
        }
      });
    }
  };

  return (
    <div className="account_container">
      <div className="icon_container">
        <i className="fa-solid fa-user"></i>
      </div>
      <h1>Create account</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="first_name" className="">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          />
          {errors.first_name && <span className="form_error">{errors.first_name}</span>}
        </div>
        <div className="input_container">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
          />
          {errors.last_name && <span className="form_error">{errors.last_name}</span>}
        </div>
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
        <div className="input_container">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          {errors.cpassword && (
            <span className="form_error">{errors.cpassword}</span>
          )}
        </div>
        <button type="submit">Create Account</button>
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
          />
          Sign Up with Google
        </button>
        <button onClick={() => {signIn('github')}}>
          <Image 
            src={'/media/png/github-mark-white.png'}
            height={40}
            width={40}
          />
          Sign Up with GitHub
        </button>
      </div>
    </div>
  );
}
