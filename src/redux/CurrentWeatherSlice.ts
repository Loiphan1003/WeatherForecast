import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentWeahter, WeatherList } from "../type";
import { apiKey } from "../api/axiosClient";
import { CurrentWeatherApi, forecastWeatherApi, historyWeatherApi } from "../api/getCurrentWeather";
import {
  calculatorHumidityPercen,
  calculatorUVIndev,
  calculatorVisibilityIndex,
  formatConditionText,
  formatTimeToYearMonthDay,
  getDayOrTimeLocaltime,
  getFirstOrLastDayInWeek,
  getListWeather,
} from "../utils";

interface CurrentWeahterSliceData {
  currentLocation: string;
  data: CurrentWeahter;
  listHour: WeatherList[];
  weatherWeek: WeatherList[];
}

const initialState: CurrentWeahterSliceData = {
  currentLocation: "Hồ Chí Minh",
  data: {
    uv: {
      uvindex: 0,
      analyze: "",
    },
    wind: "",
    sunrise: "",
    sunset: "",
    humidity: {
      humidityPercen: 0,
      analyze: '',
    },
    visibility: {
      visibilityIndex: 0,
      analyze: ''
    },
    coditionIcon: "",
    coditionText: "",
    tempC: 0,
    rainPercen : 0
  },
  listHour: [],
  weatherWeek: [],
};

export const getCurrentWeather = createAsyncThunk(
  "GET: Current Weather",
  async (location: string) => {
    try {
      const response = await CurrentWeatherApi.get({
        key: apiKey,
        q: location,
        lang: 'vi',
      });
      const data = response.data;

      const current: CurrentWeahter = {
        humidity: {
          humidityPercen: data.current.humidity,
          analyze: calculatorHumidityPercen(data.current.humidity)
        } ,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        uv: {
          uvindex: data.current.uv,
          analyze: calculatorUVIndev(data.current.uv)
        },
        visibility: {
          visibilityIndex: data.current.vis_km,
          analyze: calculatorVisibilityIndex(data.current.vis_km)
        } ,
        wind: data.current.wind_kph,
        coditionIcon: data.current.condition.icon,
        coditionText: formatConditionText(data.current.condition.text),
        tempC: data.current.temp_c,
        rainPercen: data.forecast.forecastday[0].day.daily_chance_of_rain,
      };
      if (current === undefined) return;
      return current;
    } catch (error) {
      console.log(`Fetch current weather error: ${error}`);
    }
  }
);

export const getWeatherList = createAsyncThunk("GET: Weather", async (location: string) => {
  try {
    const response = await CurrentWeatherApi.get({
      key: apiKey,
      q: location,
      lang: "vi",
    });
    const data = response.data;
    let list: WeatherList[] = [];
    data.forecast.forecastday[0].hour.map((i: any) => {
      const hourWeather: WeatherList = {
        coditionIcon: i.condition.icon,
        tempC: i.temp_c,
        time: getDayOrTimeLocaltime(i.time, "hour"),
      };
      return list.push(hourWeather);
    });

    return list;
  } catch (error) {
    console.log(`Fetch current weather error: ${error}`);
  }
});

export const getWeatherWeek = createAsyncThunk(
  "GET: Weather Week",
  async (location: string) => {
    try {
      const firstDate = getFirstOrLastDayInWeek("firstDay");
      const lastDate = getFirstOrLastDayInWeek("lastDay");
      if (firstDate === undefined || lastDate === undefined) return;
      const params = {
        key: apiKey,
        q: location,
        lang: "vi",
      };

      const historyWResponse = await historyWeatherApi.get(
        Object.assign(params, {
          dt: formatTimeToYearMonthDay(firstDate),
          end_dt: formatTimeToYearMonthDay(lastDate),
        })
      );
      const historyWeather = getListWeather(historyWResponse.data.forecast.forecastday);

      const forecastWResponse = await forecastWeatherApi.get(
        Object.assign(params, {
          days: 8 - new Date().getDay()
        })
      )

      const forecastWeather = getListWeather(forecastWResponse.data.forecast.forecastday);
      return historyWeather.concat(forecastWeather.splice(2, 3));

    } catch (error) {
      console.log(`Fetch weather week error: ${error}`);
    }
  }
);

export const CurrentWeahterSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      return state.data = action.payload;
    },
    updateCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      if (action.payload === undefined) return;
      state.data = action.payload;
    });
    builder.addCase(getWeatherList.fulfilled, (state, action) => {
      if (action.payload === undefined) return;
      state.listHour = action.payload;
    });
    builder.addCase(getWeatherWeek.fulfilled, (state, action) => {
      if (action.payload === undefined) return;
      state.weatherWeek = action.payload;
    });
  },
});

export const { setCurrentWeather, updateCurrentLocation } = CurrentWeahterSlice.actions;

export default CurrentWeahterSlice.reducer;
