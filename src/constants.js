// import { zip } from "../src/components/ForecastContainer";


export const WEATHER_URL = (zip) => `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=`
export const WEATHER_API = process.env.REACT_APP_WEATHER_API;