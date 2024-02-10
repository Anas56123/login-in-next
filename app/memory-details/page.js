"use client";
import { useEffect, useState } from "react";
import getMemoryByID from "@/supabase/MemoriesProps/getMemoryByID";
import Image from "next/image";
import deleteMemory from "@/supabase/MemoriesProps/deleteMemory";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const memoryID = localStorage.getItem("memoryID");
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        if (memoryID) {
          const userData = await getMemoryByID(memoryID);
          setData(userData?.data?.[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getData();
    return () => {};
  }, []);

  return (
    <div className="login-container">
      <h1>
        Title: <strong>{data?.title}</strong>
      </h1>
      <h1>Image: </h1>
      <Image
        className="img"
        src={data?.url}
        alt="Box Image"
        width={400}
        height={200}
      />
      <h2>Description : </h2>
      <span>{data?.description}</span>
      <br />
      <h3>Tags : </h3>
      <span>{data?.tags}</span>
      <br />
      <div>
        <button
          className="delete-btn"
          onClick={() => {
            deleteMemory(memoryID)
            localStorage.setItem("memoryID", null)
            router.push("/account");
          }}
        >
          Delete
        </button>
        <button
          className="done-btn"
          onClick={() => {
            router.push("/account");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
