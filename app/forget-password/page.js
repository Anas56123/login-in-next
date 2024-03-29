"use client";

import { useState } from "react";
import Link from "next/link";
import { getAccountId } from "@/supabase/AccountsProps/getAccountId";
import Logo from "@assets/Logo-2.png";
import Image from "next/image";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    userName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getAccountId(formData.userName);
    const { userEmail } = data?.[0];
    localStorage.setItem("userId", formData.userName);
    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.userName,
        email: userEmail,
        welcome: false,
      }),
    });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="login-container">
        <div className="login-content">
          <Image src={Logo} alt="Logo" />
          <br />
          <h1 className="login-title">Forget password</h1>
          <p>Welcome back! Please enter your details.</p>
          <form className="login-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">
              Reset now
            </button>
          </form>
          <br />
          <p>
            Won't to back login?{" "}
            <Link className="sign-up" href={"/log-in"}>
              <strong>Login form here</strong>
            </Link>
          </p>
        </div>
        <p
          style={{
            color: "#728FAA",
            textAlign: "center",
            marginTop: "15rem",
            marginBottom: "0px",
          }}
        >
          © All Rights Reserved taprime.com
        </p>
      </div>
    </>
  );
}
