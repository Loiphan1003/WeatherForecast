import { WeatherList } from "../type";


export const getDayOrTimeLocaltime = (dateTime: string, type: string) => {
    if(type === 'day'){
        const date = dateTime.split(' ')[0];
        const getDay = new Date(date);
        return getDay.getDay();
    }
    if(type === 'hour'){
        const time = dateTime.split(' ')[1];
        return time;
    }
};

export const formatTimeToYearMonthDay = (date: Date) => {
    let month: any = date.getMonth() + 1;
    if(month < 10) month = `0${month}`;
    return `${date.getFullYear()}-${month}-${date.getDate()}`
}

export const formatTimeToDayMonth = (date: string) => {
    const dateFormat = new Date(date);
    return `${dateFormat.getDate()}-${dateFormat.getMonth() < 10 ? `0${dateFormat.getMonth() + 1}` : dateFormat.getMonth() + 1}`
}


export const getFirstOrLastDayInWeek = (getType: string) => {
    const today = new Date();
    const currentDay = today.getDay();
    if(getType === 'firstDay') return new Date(today.setDate(today.getDate() - currentDay + 1));
    if(getType === 'lastDay') return new Date(today.setDate(today.getDate() - currentDay + 7));
}

export const getListWeather = (list: any[]) => {
    let res: WeatherList[] = [];
    list.map((i) => {
        const weather: WeatherList = {
            coditionIcon: i.day.condition.icon,
            tempC: i.day.maxtemp_c,
            time: formatTimeToDayMonth(i.date)
        }
        return res.push(weather);
    })
    return res;
}


export const formatConditionText = (text: string) => {
    if(text.includes('cloudy')) return "Mây";
    else if(text.includes('Sunny')) return "Nắng";
    else if(text.includes('rain')) return "Mưa";
    else return '';
}

export const calculatorUVIndev = (uvIndex: number) => {
    if(uvIndex <= 2) return "Thấp";
    else if(uvIndex >= 3 && uvIndex <= 5) return "Trung bình";
    else return "Cao";
}

export const calculatorHumidityPercen = (humidityPercen: number) => {
    if(humidityPercen < 30) return "Thấp"
    if(humidityPercen >= 30 && humidityPercen <= 50) return "Bình thường";
    else if(humidityPercen > 50 && humidityPercen <= 70) return "Trung bình";
    else return "Cao";
}

export const calculatorVisibilityIndex = (visibilityIndex: number) => {
    if(visibilityIndex <= 1) return "Thấp"
    if(visibilityIndex > 1 && visibilityIndex <= 10) return "Trung bình";
    else return "Cao";
}