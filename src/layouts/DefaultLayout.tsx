import React, { useEffect, useState } from 'react';
import Test from '../assets/images/sunny.png';
import Cloud from '../assets/images/cloud.png';
import Rain from '../assets/images/rain.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather, getWeatherList, getWeatherWeek } from '../redux/CurrentWeatherSlice';
import { RootState } from '../redux/store';
import { getAllCityVietNam } from '../redux/GeoSlice';
import { useDebounce } from '../hooks/useDebounce';
import { Backdrop } from '../components/Backdrop';
import { SearchRes } from '../components/SearchRes';

interface DefaultLayoutProps {
    children: React.ReactNode
}

const dateFormat = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];


export const DefaultLayout = (props: DefaultLayoutProps) => {


    const dispatch = useDispatch<any>();
    const currentWeatherState = useSelector((state: RootState) => state.currentWeather.data);
    const currentLocationState = useSelector((state: RootState) => state.currentWeather.currentLocation);
    const geoState = useSelector((state: RootState) => state.geo.city);

    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [searchRes, setSearchRes] = useState<string[]>([]);
    const debouncedInputValue = useDebounce(searchText, 500);

    useEffect(() => {
        dispatch(getCurrentWeather("Hồ Chí Minh"));
        dispatch(getWeatherList("Hồ Chí Minh"));
        dispatch(getWeatherWeek("Hồ Chí Minh"));
        dispatch(getAllCityVietNam());
    }, [dispatch])

    useEffect(() => {
        const date = new Date();
        setDate(dateFormat[date.getDay() - 1])
        const interval = setInterval(() => {
            const time = new Date();
            setTime(`${time.getHours()}.${time.getMinutes()}`)
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        let geoFilter: string[] = [];
        if (debouncedInputValue === undefined || debouncedInputValue === '') return;
        geoState.forEach((i: any) => {
            if (!i.includes(debouncedInputValue)) return;
            return geoFilter.push(i);
        })
        setSearchRes(geoFilter)
    }, [debouncedInputValue, geoState]);


    return (
        <div className='relative w-screen h-full  md:h-screen lg:bg-main-pattern lg:bg-cover lg:bg-no-repeat ' >
            <div
                className="max-w-[1160px] h-screen
                flex flex-col md:flex-row md:mx-auto"
            >
                <aside
                    className="w-full md:w-[30%] h-screen px-3 py-7 box-border
                bg-white"
                >

                    <div
                        className="relative w-[100%] h-fit z-10 rounded-lg shadow-lg shadow-white-500/50 "
                    >
                        <input
                            className="outline-none m-2 w-full"
                            type="text"
                            name=""
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder='Nhập địa điểm'
                            value={searchText}
                        />

                        {searchText !== '' &&
                            <SearchRes data={searchRes} reset={() => setSearchText('')} />
                        }
                    </div>

                    <div className="w-full h-[100px] flex justify-center items-center" >
                        <img
                            className="w-[100px]"
                            src={currentWeatherState.coditionIcon !== undefined ? currentWeatherState.coditionIcon : Test}
                            alt="weather icon"
                        />
                    </div>

                    <div
                        className="w-auto flex flex-row md:flex-col items-center 
                        md:items-start gap-5"
                    >
                        <div
                            className="mt-[30px] w-[40%] flex flex-col  gap-3 px-2 box-border"
                        >
                            <p className="text-[40px] md:text-[60px]" >{currentWeatherState.tempC}°C</p>

                            <p className="font-semibold" >{date}, <span>{time}</span></p>

                            <div className="mt-8" >
                                <div
                                    className="flex flex-row items-center gap-2"
                                >
                                    <img src={Cloud} alt="wheather icon" />
                                    <p>{currentWeatherState.coditionText}</p>
                                </div>

                                <div
                                    className="mt-2 flex flex-row items-center gap-2"
                                >
                                    <img src={Rain} alt="Rain" />
                                    <p>Mưa - {currentWeatherState.rainPercen}%</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="w-[60%] md:w-full h-[240px] mt-7 rounded-2xl bg-hero bg-cover lg:bg-no-repeat
                        flex justify-center pt-20 box-border"
                        >
                            <p className="font-bold" >{currentLocationState}</p>
                        </div>
                    </div>
                </aside>

                <main
                    className="w-full md:w-[70%] h-fit md:h-screen"
                >
                    {props.children}
                </main>
            </div>

            {searchText !== '' && <Backdrop onClick={() => setSearchText('')} />}

        </div>
    )
}
