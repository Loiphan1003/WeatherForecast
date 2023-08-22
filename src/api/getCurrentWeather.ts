import axiosClient from "./axiosClient";

const baseURL = "http://api.weatherapi.com/v1";


export const CurrentWeatherApi = {
    get: (params: { key: string, q: string, lang: string }) => {
        const url = `${baseURL}/forecast.json??key=${params.key}&q=${params.q}&lang=${params.lang}`;
        return axiosClient.get(url, {params})
    }
}

export const historyWeatherApi = {
    get: (params: { key: string, q: string, lang: string, dt: string, end_dt: string  }) => {
        const url = `${baseURL}/history.json?key=${params.key}&q=${params.q}&lang=${params.lang}&dt=${params.dt}&end_dt=${params.end_dt}`;
        return axiosClient.get(url)
    }
}

export const forecastWeatherApi = {
    get: (params: { key: string, q: string, lang: string, days: number }) => {
        const url = `${baseURL}/forecast.json?key=${params.key}&q=${params.q}&lang=${params.lang}&days=${params.days}`;
        return axiosClient.get(url)
    }
}