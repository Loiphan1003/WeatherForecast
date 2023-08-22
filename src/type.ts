export interface CurrentWeahter {
    uv: {
        uvindex: number,
        analyze: string,
    },
    wind: string,
    sunrise: string,
    sunset: string,
    humidity: {
        humidityPercen: number,
        analyze: string,
    },
    visibility: {
        visibilityIndex: number,
        analyze: string,
    },
    coditionIcon: string,
    coditionText: string,
    tempC: number,
    rainPercen: number,
}

export interface WeatherList {
    time: string | undefined | number,
    coditionIcon: string,
    tempC: number
}

export interface City {
    name: string,
}