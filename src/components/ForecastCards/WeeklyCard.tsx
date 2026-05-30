import { useState } from "react";
import { getWeatherDescription } from "../../utils/getWeatherDescription";
import WeeklyInfoCard from "../InfoCards/WeeklyInfoCard";

function WeeklyCard({ weatherData }: any) {
    const [displayDays, setDisplayDays] = useState(6);
    if (!weatherData) return null;
    const daily = weatherData?.daily?.time?.map((time: string, index: number) => ({
        time,
        temperature_2m_max: weatherData.daily.temperature_2m_max[index],
        temperature_2m_min: weatherData.daily.temperature_2m_min[index],
        weather_code: weatherData.daily.weather_code[index],
        precipitation: weatherData.daily.precipitation_probability_max[index],
    }));
    const units = weatherData?.daily_units;
    return (
        <div className="flex flex-col bg-blue-200 rounded-2xl max-w-sm pb-3 md:mt-0 mt-3">
            <div className="">
                <p className="text-3xl text-center">Weekly</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {daily.slice(0, displayDays).map((day: any, index: any) => {
                        const max_temp = `${Math.round(day.temperature_2m_max)}${units.temperature_2m_max}`;
                        const min_temp = `${Math.round(day.temperature_2m_min)}${units.temperature_2m_min}`;
                        const precipitation = `${day.precipitation}${units.precipitation_probability_max}`;
                        return (
                            <WeeklyInfoCard
                                key={index}
                                max_temp={max_temp}
                                min_temp={min_temp}
                                precipitation={precipitation}
                                time={day.time}
                                icon={getWeatherDescription(day.weather_code, 1).icon}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center gap-3 my-3">
                <button
                    className="bg-sky-100 border border-gray-400 rounded-xl p-1 hover:bg-sky-200"
                    onClick={() => setDisplayDays(displayDays + 3)}
                >
                    Show More
                </button>
                <button
                    className="bg-sky-100 border border-gray-400 rounded-xl p-1 hover:bg-sky-200"
                    onClick={() => {
                        if (displayDays > 3) {
                            setDisplayDays(displayDays - 3);
                        }
                    }}
                >
                    Show Less
                </button>
            </div>
        </div>
    );
}

export default WeeklyCard;
