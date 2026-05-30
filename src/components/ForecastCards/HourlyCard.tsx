import { useState } from "react";
import { getWeatherDescription } from "../../utils/getWeatherDescription";
import HourlyInfoCard from "../InfoCards/HourlyInfoCard";

function HourlyCard({ weatherData, timezone }: any) {
    const [displayHours, setDisplayHours] = useState(6);
    if (!weatherData || !timezone) return null;

    const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    const hourly = weatherData?.hourly?.time
        ?.map((time: string, index: number) => ({
            time,
            temperature_2m: weatherData.hourly.temperature_2m[index],
            weather_code: weatherData.hourly.weather_code[index],
            isDay: weatherData.hourly.is_day[index],
            precipitation: weatherData.hourly.precipitation_probability[index],
            uvIndex: weatherData.hourly.uv_index[index],
            windSpeed: weatherData.hourly.wind_speed_10m[index],
            windDirection: weatherData.hourly.wind_direction_10m[index],
        }))
        .filter((hour: any) => {
            const hourTime = new Date(hour.time);
            return hourTime >= now;
        });
    const units = weatherData?.hourly_units;
    return (
        <div className="flex flex-col bg-blue-200 rounded-2xl p-2 max-w-sm">
            <p className="text-3xl text-center">Hourly</p>
            {hourly.slice(0, displayHours).map((hour: any, index: any) => {
                const temp = `${Math.round(hour.temperature_2m)}${units.temperature_2m}`;
                const precipitation = `${hour.precipitation}${units.precipitation_probability}`;
                const wind = `${Math.round(hour.windSpeed)} ${units.wind_speed_10m}`;
                return (
                    <HourlyInfoCard
                        key={index}
                        icon={getWeatherDescription(hour?.weather_code, hour?.isDay).icon}
                        temp={temp}
                        condition={hour.weather_code}
                        time={hour.time}
                        day={hour?.isDay}
                        precipitation={precipitation}
                        uv={Math.round(hour?.uvIndex)}
                        wind={wind}
                    />
                );
            })}
            <div className="flex justify-center gap-3">
                <button
                    className="bg-sky-100 border border-gray-400 rounded-xl p-1 hover:bg-sky-200"
                    onClick={() => setDisplayHours(displayHours + 6)}
                >
                    Show More
                </button>
                <button
                    className="bg-sky-100 border border-gray-400 rounded-xl p-1 hover:bg-sky-200"
                    onClick={() => {
                        if (displayHours > 6) {
                            setDisplayHours(displayHours - 6);
                        }
                    }}
                >
                    Show Less
                </button>
            </div>
        </div>
    );
}

export default HourlyCard;
