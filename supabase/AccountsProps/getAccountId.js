"use server";
import supabase from "../supabase";

export async function getAccountId(id) {
  let data = await supabase.from("Acconts").select("*").eq("userName", id);
  // if (error) {
  //   console.error(error);
  //   return;
  // }
  console.log(data);
  return data;
}
