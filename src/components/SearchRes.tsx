import React from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentWeather, getWeatherList, getWeatherWeek, updateCurrentLocation } from '../redux/CurrentWeatherSlice';

interface SearchResProps {
    data: string[],
    reset: () => void,
}

export const SearchRes = (props: SearchResProps) => {

    const dispatch = useDispatch<any>();

    const handleClick = (nameOfCity: string) => {
        if(nameOfCity === '' || nameOfCity === undefined) return;
        dispatch(updateCurrentLocation(nameOfCity));
        dispatch(getCurrentWeather(nameOfCity));
        dispatch(getWeatherList(nameOfCity));
        dispatch(getWeatherWeek(nameOfCity));
        return props.reset();
    }

    return (
        <div
            className="mt-2 rounded-md w-full h-fit max-h-[200px] bg-white absolute z-10 
            shadow-lg shadow-white-500/50 
            overflow-y-scroll transition-opacity duration-50"
        >
            <p className="text-end text-[14px]" >{props.data.length} Kết quả tìm kiếm</p>
            {props.data.length !== 0 && props.data.map((i) => {
                return (
                    <div 
                        className="w-full h-fit p-2 box-border hover:bg-blue-500 
                        hover:text-white hover:cursor-pointer"
                        key={i} 
                        onClick={() => handleClick(i)}
                    >
                        <p>{i}</p>
                    </div>
                )
            })}
        </div>
    )
}
