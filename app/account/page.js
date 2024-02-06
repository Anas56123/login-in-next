"use client";

import { getAccountId } from "@/supabase/getAccountId";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Account() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userData = await getAccountId(userId);
          setData(userData?.data?.[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <p>Name: {data?.userName}</p>
      <p>Email: {data?.userEmail}</p>
      <p>Password: {data?.userPassword}</p>
      <p>PhoneNumber: {data?.userPhoneNumber}</p>
      <Link href={'/reset-your-password'}>Reset your password</Link>
    </>
  );
}
