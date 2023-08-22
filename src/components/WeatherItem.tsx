import React from 'react'
import { WeatherList } from '../type'

interface WeatherItemProps {
    data: WeatherList,
}

export const WeatherItem = (props: WeatherItemProps) => {

    return (
        <div
            className="w-[120px] h-[150px] rounded-md bg-white
            flex-none relative box-border"
        >
            <div className="w-[80px] h-[80px] flex flex-col justify-center items-center
            absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" >
                <p>{props.data.time}</p>
                <img src={props.data.coditionIcon} alt="icon" />
                <p>{props.data.tempC}°C</p>
            </div>
        </div>
    )
}
