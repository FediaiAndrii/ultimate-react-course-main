import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://iblhvovmlneeggwspspg.supabase.co";
const supabaseKey = "sb_publishable_gK0PLD_8jY_3WnvTAVSKPA_rExM71i5";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
