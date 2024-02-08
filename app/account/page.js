"use client";

import Memory from "@/Components/memory";
import { getAccountId } from "@/supabase/AccountsProps/getAccountId";
import getMemories from "@/supabase/MemoriesProps/getMemories";
import Logo from "@assets/Logo-2.png";
import { useEffect, useState } from "react";
import Pagination from "@/Components/Pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DragAndDrop from "@/Components/Drag&Drop";
import addMemories from "@/supabase/MemoriesProps/addMemories";

export default function Account() {
  const [data, setData] = useState([]);
  const [memories, setMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
  });
  const [dataUri, setDataUri] = useState("");
  const router = useRouter();
  const postPerPage = 5;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = memories?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (numbers) => {
    setCurrentPage(numbers);
  };
  const nextPage = (numbers) => {
    if (numbers == currentPage) return;
    setCurrentPage(currentPage + 1);
  };
  const prevPage = (numbers) => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
  };
  const logOut = () => {
    router.push("/log-in");
    localStorage.setItem("userId", null);
  };
  const resetYourPassword = () => {
    router.push("/reset-your-password");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, url: dataUri });
    console.log("formData =", formData);
  };

  function handleSubmit(e) {
    e.preventDefault();
    addMemories(formData);
    setFormData({
      title: "",
      url: "",
      description: "",
      tags: "",
    });
  }

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
      const res = await getMemories();
      setMemories(res);
    }
    fetchData();
    getM();

    return () => {};
  }, [formData]);

  return (
    <>
      <header>
        <Image src={Logo} alt="Logo" width={300} />
        <div>
          <p>{data?.userName}</p>
          <button
            onClick={() => resetYourPassword()}
            style={{ width: "10rem" }}
            className="btn btn-primary"
          >
            Reset your password
          </button>
          <br />
          <button
            onClick={() => logOut()}
            style={{ width: "10rem" }}
            className="btn log-out"
          >
            Log out
          </button>
        </div>
      </header>
      <br />
      <div>
        <div className="u">
          <nav>
            <div className="memory-container">
              <ul className="memory-list">
                {currentPost?.map((memory, index) => {
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
              <Pagination
                postPerPage={postPerPage}
                totalPosts={memories.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </div>
          </nav>
          <form onSubmit={handleSubmit}>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="form-control"
              placeholder="Your memory title"
              value={formData?.title}
              onChange={handleChange}
            />
            <br />
            <input
              id="des"
              name="description"
              type="text"
              required
              className="form-control"
              placeholder="descripe"
              value={formData?.description}
              onChange={handleChange}
            />
            <br />
            <input
              id="tags"
              name="tags"
              type="text"
              required
              className="form-control"
              placeholder="#somthing"
              value={formData?.tags}
              onChange={handleChange}
            />
            <br />
            <DragAndDrop setDataUri={setDataUri} handleChange={handleChange} />
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
