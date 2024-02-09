"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@assets/Logo-2.png";
import { getAccount } from "@/supabase/AccountsProps/getAccount";
import { useRouter } from "next/navigation";

export default function Home() {
  // TODO https://react.dev/reference/react/useRef
  let fetchedData;
  const router = useRouter();
  (async function () {
    fetchedData = await getAccount();
  })();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoding, setIsLoding] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchedData?.map((data, index) => {
      setIsLoding(true);
      setIsWrong(false);
      if (data?.userEmail == formData.email) {
        if (data.userPassword == formData.password) {
          setIsCorrect(true);
          setIsLoding(false);
          localStorage.setItem("userId", data.userName);
          router.push("/account");
        } else {
          setIsWrong(true);
          setIsLoding(false);
        }
      } else {
        setIsWrong(true);
        setIsLoding(false);
      }
    });
  };

  // function sentProps() {
  //   CRouter().push({
  //     pathname: "/account",
  //     query: {
  //       id: userID,
  //     },
  //   });
  // }

  return (
    <>
      {isCorrect ? (
        <p>go to account</p>
      ) : (
        <>
          <div className="login-container">
            {isLoding ? (
              <p>Loding...</p>
            ) : (
              <div className="login-content">
                <Image src={Logo} alt="Logo" />
                <br />
                <h1 className="login-title">Log in</h1>
                <p>Welcome back! Please enter your details.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label style={{ marginBottom: "1rem" }}>Email</label>
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
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      id="passwordL"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="form-control"
                      placeholder="Entre your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }} className="split">
                    <div>
                      <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        style={{border: "#ccc"}}
                      />
                      <span style={{ color: "GrayText" }}>Remember me</span>
                    </div>
                    <Link className="sign-up" href={"/forget-password"}>
                      Forget password?
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </form>
                <p style={{ marginTop: "1rem", marginBottom: "19rem" }}>
                  Don't have an account?{" "}
                  <Link className="sign-up" href={"/sign-up"}>
                    <strong>Sign Up</strong>
                  </Link>
                </p>
                {isWrong ? (
                  <p style={{ color: "#f00" }}>
                    Wrong. right the email or the password again
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
            <span style={{ color: "#728faa" }}>
              © All Rights Reserved taprime.com
            </span>
          </div>
        </>
      )}
    </>
  );
}
