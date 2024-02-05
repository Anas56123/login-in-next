"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      email: "",
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <img src="@/public/assets/Logo-2.png" alt="Logo" />
          <br />
          <h1 className="login-title">Forget password</h1>
          <p>Welcome back! Please enter your details.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="emailL"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Entre your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset now
            </button>
          </form>
          <p>
            Won't to back login?{" "}
            <Link className="sign-up"href={"/"}>
              <strong>Login form here</strong>
            </Link>
          </p>
        </div>
      </div>
      <p className="arrt">© All Rights Reserved taprime.com</p>
    </>
  );
}
