import { configureStore } from "@reduxjs/toolkit";
import { CurrentWeahterSlice } from "./CurrentWeatherSlice";
import GeoSlice from "./GeoSlice";

const store = configureStore({
    reducer: {
        currentWeather: CurrentWeahterSlice.reducer,
        geo: GeoSlice
    },
    devTools: false
})


export type RootState = ReturnType<typeof store.getState>
export default store;