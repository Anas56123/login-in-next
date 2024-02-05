import supabase from "./supabase";

export async function getAccount() {
  let { data, error } = await supabase
    .from("Acconts")
    .select("*")
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
  return data
}
