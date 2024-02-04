"use client";

import Link from "next/link";
import { useState } from "react";

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstDigit = formData.phoneNumber.charAt(0);
    if (!["9", "5", "4", "2"].includes(firstDigit)) {
      alert("Phone number must start with 9, 5, 4, or 2");
      return;
    }
    if (formData.phoneNumber.length !== 8) {
      alert("Phone number must be exactly 8 digits long");
      return;
    }
    if (formData.name.length < 3) {
      alert("The name must be at least 3 digits");
      return;
    }
    if (formData.password.length < 8) {
      alert("The password must be at least 8 digits");
      return;
    }
    console.log(formData);

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.name,
        email: formData.email,
      }),
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Sign up</h1>
          <p>Welcome to Dass! Please enter your phone number</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                id="emailS"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                id="passwordS"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className="form-control"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="sign-up"href={"/"}>
              <strong>Log In</strong>
            </Link>
          </p>
        </div>
      </div>
      <p className="arrt">© All Rights Reserved taprime.com</p>
    </>
  );
}

export default SignupPage;
