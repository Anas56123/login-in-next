"use server";
import supabase from "../supabase";

export default async function getMemoryByID(id) {
  let data  = await supabase.from("Memories").select('*').eq("id", id);
  return data;
}
