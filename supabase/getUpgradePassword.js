import supabase from "./supabase";

export default async function getUpgradePassword(updatedPassword, name) {
  const { data, error } = await supabase
    .from("Acconts")
    .update({ userPassword: updatedPassword })
    .eq("userName", name)
    .select();
}
