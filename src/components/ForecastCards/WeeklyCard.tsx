import { getWeatherDescription } from "../../utils/getWeatherDescription";
import WeeklyInfoCard from "../InfoCards/WeeklyInfoCard";

function WeeklyCard({ weatherData }: any) {
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
        <>
            <div className="flex flex-col bg-blue-200 rounded-2xl">
                <div className="">
                    <p className="text-3xl text-center">Weekly</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {daily.map((day: any, index: any) => {
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
            </div>
        </>
    );
}

export default WeeklyCard;
