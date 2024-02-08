"use client";

import getUpgradePassword from "@/supabase/AccountsProps/getUpgradePassword";
import { useState } from "react";
import Image from "next/image";
import Logo from "@assets/Logo-2.png";
import { useRouter } from "next/navigation";

export default function ResetYourPassword() {
  const [formDataOne, setformDataOne] = useState({
    userPassword: "",
  });
  const [formDataTwo, setformDataTwo] = useState({
    userPassword: "",
  });
  const [errorNum, setErrorNum] = useState(0);
  const router = useRouter();

  const handleChangeOne = (e) => {
    setformDataOne({ ...formDataOne, [e.target.name]: e.target.value });
  };

  const handleChangeTwo = (e) => {
    setformDataTwo({ ...formDataTwo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formDataOne =", formDataOne);
    console.log("formDataTwo =", formDataTwo);
    if (!(formDataOne?.userPassword === formDataTwo?.userPassword)) {
      setErrorNum(1);
      return;
    }
    if (formDataOne?.userPassword.length < 8) {
      setErrorNum(2);
      return;
    }
    const userId = localStorage?.getItem("userId");
    setErrorNum(3);
    getUpgradePassword(formDataOne.userPassword, userId);
    router.push("/account");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <Image src={Logo} alt="Logo" />
          <br />
          <h1 className="login-title">Reset your password</h1>
          <p>Welcome back! Please enter your details.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New password</label>
              <input
                id="new-userPassword"
                name="userPassword"
                type="password"
                autoComplete="current-userPassword"
                required
                className="form-control"
                placeholder="Enter your new password"
                value={formDataOne.userPassword}
                onChange={handleChangeOne}
              />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input
                id="confirm-new-userPassword"
                name="userPassword"
                type="password"
                autoComplete="current-userPassword"
                required
                className="form-control"
                placeholder="Confirm your new password"
                value={formDataTwo.userPassword}
                onChange={handleChangeTwo}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Restore
            </button>
            <p style={errorNum === 3 ? { color: "#0f0" } : { color: "#f00" }}>
              {errorNum === 0
                ? ""
                : errorNum === 1
                ? "The confirm and the new password must be the same"
                : errorNum === 2
                ? "Password must be exactly 8 digits long"
                : errorNum === 3
                ? "The account done sucsussfuly"
                : "Some thing went wrong please reload the page"}
            </p>
          </form>
        </div>
      </div>
      <p className="arrt">© All Rights Reserved taprime.com</p>
    </>
  );
}
