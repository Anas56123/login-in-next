import supabase from "../supabase";

export default async function getMemories() {
  let { data, error } = await supabase.from("Memories").select("*");
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
  return data;
}
