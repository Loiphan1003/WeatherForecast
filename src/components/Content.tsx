import React, { useState } from 'react'
import { WeatherItem } from './WeatherItem';
import Sunset from '../assets/images/sunset.png';
import Sunrise from '../assets/images/sunrise.png';
import Like from '../assets/images/like.png';
import DisLike from '../assets/images/dislike.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { WeatherList } from '../type';
import './content.css';

const menu = ['Hôm nay', 'Tuần'];

export const Content = () => {

    const currentWeatherState = useSelector((state: RootState) => state.currentWeather.data);
    const weatherHourTodayState = useSelector((state: RootState) => state.currentWeather.listHour);
    const weatherAcordingWeekState = useSelector((state: RootState) => state.currentWeather.weatherWeek);

    const [menuSelect, setMenuSelect] = useState<string>('Hôm nay');

    const handleClickMenu = (text: string) => {
        setMenuSelect(text);
    }

    return (
        <div
            className="w-full  bg-gray-200 
            px-5 py-6 box-border container"
        >
            <div
                className="flex flex-row gap-4 items-center"
            >
                {menu.map((item) => (
                    <div
                        key={item}
                        className={menuSelect === item ? "font-semibold text-[20px] hover:cursor-pointer" : "hover:cursor-pointer"}
                        onClick={() => handleClickMenu(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {menuSelect === "Hôm nay" &&
                <div
                    className="w-auto h-fit flex gap-2 mt-6 pb-1 box-border
                    relative overflow-x-scroll overflow-y-hidden"
                >
                    {weatherHourTodayState.map((i: WeatherList) => (
                        <WeatherItem
                            key={i.time}
                            data={i}
                        />
                    ))}
                </div>
            }

            {menuSelect === "Tuần" &&
                <div
                    className="w-auto h-fit flex gap-2 mt-6 pb-1 box-border
                    relative overflow-x-scroll overflow-y-hidden"
                >
                    {weatherAcordingWeekState.map((i: WeatherList) => (
                        <WeatherItem
                            key={i.time}
                            data={i}
                        />
                    ))}
                </div>
            }

            <div
                className="mt-10 h-auto"
            >
                <h2 className="text-[20px] font-bold" >Điểm nổi bật ngày hôm nay</h2>

                <div
                    className="pt-3 box-border grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4"
                >
                    <div
                        className="h-[150px] pt-2 px-2 box-border flex flex-col  bg-white rounded-md"
                    >
                        <p>UV</p>

                        <p className="text-[50px]" >{currentWeatherState.uv.uvindex}</p>

                        <div className="flex flex-row items-center gap-2" >
                            <p>{currentWeatherState.uv.analyze}</p>
                            <img
                                className="h-[30px]"
                                src={currentWeatherState.uv.uvindex  < 6 ? Like : DisLike}
                                alt="icon status" />
                        </div>
                    </div>

                    <div
                        className="h-[150px] pt-2 px-2 box-border flex flex-col bg-white rounded-md"
                    >
                        <p>Gió</p>

                        <p className="" >
                            <span className="text-[50px]" >{currentWeatherState.wind}</span> km/h
                        </p>
                    </div>

                    <div
                        className="h-[150px] pt-2 px-2 box-border flex flex-col gap-3
                        bg-white rounded-md"
                    >
                        <p>Bình minh & Hoàng hôn</p>

                        <div className="flex flex-col gap-2" >
                            <div className="flex flex-row gap-3 items-center" >
                                <img src={Sunrise} alt="Bình minh" />
                                <p className="font-semibold" >{currentWeatherState.sunrise}</p>
                            </div>

                            <div className="flex flex-row gap-3 items-center" >
                                <img src={Sunset} alt="hoàng hôn" />
                                <p className="font-semibold" >{currentWeatherState.sunset}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="h-[150px] pt-2 px-2 box-border flex flex-col bg-white rounded-md"
                    >
                        <p>Độ ẩm</p>

                        <p><span className="text-[50px]" >{currentWeatherState.humidity.humidityPercen}</span> %</p>

                        <div className="flex flex-row items-center gap-2" >
                            <p>{currentWeatherState.humidity.analyze}</p>
                            <img
                                className="h-[30px]"
                                src={currentWeatherState.humidity.humidityPercen >= 40 && currentWeatherState.humidity.humidityPercen <= 60 ? Like : DisLike}
                                alt="icon status" />
                        </div>
                    </div>

                    <div
                        className="h-[150px] pt-2 px-2 box-border flex flex-col bg-white rounded-md"
                    >
                        <p >Tầm nhìn</p>

                        <p><span className="text-[50px]" >{currentWeatherState.visibility.visibilityIndex}</span> km</p>

                        <div className="flex flex-row items-center gap-2" >
                            <p>{currentWeatherState.visibility.analyze}</p>
                            <img
                                className="h-[30px]"
                                src={currentWeatherState.visibility.analyze === "Trung bình" || currentWeatherState.visibility.analyze === "Cao" ? Like : DisLike}
                                alt="icon status" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
