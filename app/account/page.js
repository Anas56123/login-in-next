"use client";

import Memory from "@/Components/memory";
import { getAccountId } from "@/supabase/AccountsProps/getAccountId";
import getMemories from "@/supabase/MemoriesProps/getMemories";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Account() {
  const [data, setData] = useState(null);
  const [memories, setMemories] = useState(null);

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
    async function getM() {
      const re = await getMemories();
      console.log("re = ", re);
      setMemories(re);
    }
    fetchData();
    getM();

    return () => {};
  }, []);

  return (
    <>
      <p>Name: {data?.userName}</p>
      <p>Email: {data?.userEmail}</p>
      <p>Password: {data?.userPassword}</p>
      <p>PhoneNumber: {data?.userPhoneNumber}</p>
      <Link href={"/reset-your-password"}>Reset your password</Link>
      <br />
      <header>
        <div className="container">
          <h1>Memories Website</h1>
          <nav>
            <div className="container">
              <h2>Memories</h2>
              <ul className="memory-list">
                {memories?.map((memory, index) => {
                  if (index == 10) return;
                  return (
                    <li key={index}>
                      <Memory
                        title={memory.title}
                        imgSrc={memory.url}
                        description={memory.description}
                        date={memory.created_at}
                        likesNumber={memory.likesNumber}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
