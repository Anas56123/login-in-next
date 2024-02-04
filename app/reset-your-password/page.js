"use client";

import { useState } from "react";

export default function ResetYourPassword() {
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      password: "",
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <img src="./assets/Group 2.png" alt="Logo" />
          <br />
          <h1 className="login-title">Reset your password</h1>
          <p>Welcome back! Please enter your details.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New password</label>
              <input
                id="new-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Enter your new password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input
                id="confirm-new-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Confirm your new password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Restore
            </button>
          </form>
        </div>
      </div>
      <p className="arrt">© All Rights Reserved taprime.com</p>
    </>
  );
}
