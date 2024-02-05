import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cqrmexkgwtucsgeiuoqu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxcm1leGtnd3R1Y3NnZWl1b3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MTUzNzAsImV4cCI6MjAyMjI5MTM3MH0.gnWxHTCB3QxMexIemh3-M6tkATnCIqVPgmdTQ0hFVzo";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
