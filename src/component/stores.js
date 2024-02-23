import { supabase } from "../supabaseClient";
export const Stores = [
    {
        "id":1,
        "name":"flour store",
        "location":"N2J4B9",
        "color": "#DFFF00"
    },
    {
        "id":2,
        "name":"lanzhou noodle",
        "location":"N2J3V5",
        "color": "#DE3163"
    },
    {
        "id":3,
        "name":"wstore",
        "location":"N2J4V2",
        "color": "#6495ED"
    },
    {
        "id":4,
        "name":"fantastic wolk",
        "location":"A3B1F3",
        "color": "#23C63A"
    } 
]

export const upsertStore = async () => {
    const tableName = 'restaurants'
    Stores.forEach(async store => {
        try {
            const { data, error } = await supabase
            .from(tableName)
            .upsert([{ restaurant_id: store.id, restaurant_name: store.name }])
            // .select('restaurant_id, restaurant_name');
            if (error) {
                console.log("error", error);
                throw error;
            }
            else {
                console.log("store upserted", data);
            }
        } catch (error) {
            console.error('Error upserting store:', error.message);
        }  
    })
}
