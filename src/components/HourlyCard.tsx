import { useState } from "react";
import { getWeatherDescription } from "../utils/getWeatherDescription";
import HourlyInfoCard from "./HourlyInfoCard";

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
        }))
        .filter((hour: any) => {
            const hourTime = new Date(hour.time);
            return hourTime >= now;
        });
    const units = weatherData?.hourly_units;
    return (
        <>
            <div className="flex flex-col bg-blue-200 w-full rounded-2xl py-4 px-2">
                <p className="text-lg md:text-3xl lg:text-4xl mb-4 text-center">Hourly</p>
                {hourly.slice(0, displayHours).map((hour: any, index: any) => {
                    const temp = `${Math.round(hour.temperature_2m)}${units.temperature_2m}`;
                    const precipitation = `${hour.precipitation}${units.precipitation_probability}`;
                    return (
                        <HourlyInfoCard
                            key={index}
                            icon={getWeatherDescription(hour?.weather_code, hour?.isDay).icon}
                            temp={temp}
                            condition={hour.weather_code}
                            time={hour.time}
                            day={hour?.isDay}
                            precipitation={precipitation}
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
        </>
    );
}

export default HourlyCard;
