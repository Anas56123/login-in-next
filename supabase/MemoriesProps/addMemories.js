import supabase from "../supabase";

export default async function addMemories(addedObj) {
  const { data, error } = await supabase
    .from("Memories")
    .insert([addedObj])
    .select();
}
