import supabase from "../supabase";

export default async function deleteMemory(id) {
  const { error } = await supabase
    .from("Memories")
    .delete()
    .eq("id", id);
    if (error) {
        console.error(error);
    }
}
