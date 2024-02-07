import supabase from "../supabase";

export default async function InsertAccount(dataObj) {
  const { data, error } = await supabase
    .from("Acconts")
    .insert([dataObj])
    .select();

    if (error) {
        console.error(error);
        return;
      }
}
