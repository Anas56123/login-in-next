"use client";
import { useRouter } from "next/navigation";

export default function page() {
  useRouter().push("/account");
}
