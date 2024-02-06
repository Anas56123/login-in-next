"use client";

import InsertAccount from "@/supabase/InsertAccount";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupPage() {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    userPhoneNumber: "",
  });
  const [errorNum, setErrorNum] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstDigit = formData.userPhoneNumber.charAt(0);
    if (!["9", "5", "4", "2"].includes(firstDigit)) {
      setErrorNum(1);
      return;
    }
    if (formData.userPhoneNumber.length !== 8) {
      setErrorNum(2);
      return;
    }
    if (formData.userName.length < 3) {
      setErrorNum(3);
      return;
    }
    if (formData.userPassword.length < 8) {
      setErrorNum(4);
      return;
    }
    console.log(formData);
    formData.userPhoneNumber = Number(formData.userPhoneNumber);

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.userName,
        email: formData.userEmail,
        welcome: true,
      }),
    });

    InsertAccount(formData);
    localStorage.setItem("userId", formData.userName);
    router.push("/account");
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
                name="userEmail"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Email address"
                value={formData?.userEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                id="passwordS"
                name="userPassword"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Password"
                value={formData.userPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                id="name"
                name="userName"
                type="text"
                autoComplete="name"
                required
                className="form-control"
                placeholder="Name"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                id="phoneNumber"
                name="userPhoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className="form-control"
                placeholder="Phone Number"
                value={formData.userPhoneNumber}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="sign-up" href={"/log-in"}>
              <strong>Log In</strong>
            </Link>
          </p>
        </div>
        <p style={{ color: "#f00" }}>
          {errorNum === 0
            ? ""
            : errorNum === 1
            ? "Phone number must start with 9, 5, 4, or 2"
            : errorNum === 2
            ? "Phone number must be exactly 8 digits long"
            : errorNum === 3
            ? "The name must be at least 3 digits"
            : errorNum === 4
            ? "The password must be at least 8 digits"
            : "Some thing went wrong please reload the page"}
        </p>
      </div>
      <p className="arrt">© All Rights Reserved taprime.com</p>
    </>
  );
}

export default SignupPage;
