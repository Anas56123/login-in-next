import deleteMemory from "@/supabase/MemoriesProps/deleteMemory";
import getMemoryByID from "@/supabase/MemoriesProps/getMemoryByID";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Memory = ({ title, imgSrc, id, setFormData, setEditMode }) => {
  const [curHold, setCurHold] = useState(false);
  const router = useRouter();

  async function editData() {
    const data = await getMemoryByID(id);
    const { data: memoryData } = data;
    setFormData({
      title: memoryData?.[0]?.title,
      url: memoryData?.[0]?.url,
      description: memoryData?.[0]?.description,
      tags: memoryData?.[0]?.tags,
    });
    setEditMode(true)
    deleteMemory(id);
  }

  return (
    <>
      <div>
        <button className="editBtn" onClick={() => editData()}>
          <strong>...</strong>
        </button>
        <div
          onMouseEnter={() => {
            setCurHold(true);
          }}
          onMouseLeave={() => {
            setCurHold(false);
          }}
          onClick={() => {
            localStorage.setItem("memoryID", id);
            router.push("/memory-details");
          }}
          className={`imageContainer ${curHold ? "hold" : ""}`}
        >
          <Image
            className="img"
            src={imgSrc}
            alt="Box Image"
            width={200}
            height={100}
          />
          <div className={"imageText"}>{title}</div>
        </div>
      </div>
    </>
  );
};

export default Memory;
