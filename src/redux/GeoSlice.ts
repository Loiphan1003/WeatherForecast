import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { City } from "../type";
import { getAllCityInVietNam } from "../api/geoApi";


interface GeoSliceType {
    city: City[],
}

const initialState: GeoSliceType = {
    city: []
}

export const getAllCityVietNam = createAsyncThunk(
    "GET: Get all name city",
    async () => {
        try {
            let cities: City[] = [];
            const response = await getAllCityInVietNam.get()
            response.data.geonames.map((i: any) => {
                return cities.push(i.adminName1)
            })
            return cities;
        } catch (error) {
            
        }
    }
)



export const GeoSlice = createSlice({
    name: "geo",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getAllCityVietNam.fulfilled, (state, action) => {
            if(action.payload === undefined) return;
            state.city = action.payload;
        })
    },
})

export default GeoSlice.reducer;