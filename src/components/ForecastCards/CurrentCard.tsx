import { getWeatherDescription } from "../../utils/getWeatherDescription";
import { getIcon } from "../../utils/getIcon";
import CurrentInfoCard from "../InfoCards/CurrentInfoCard";

function CurrentCard({ weatherData, hourlyWeather, timezone, location }: any) {
    const displayAddress = location?.postalAddress
        ? `${location?.postalAddress?.locality}`
        : `${location?.formattedAddress.split(",")[0]}`;
    const cur = weatherData?.current;
    const units = weatherData?.current_units;
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    now.setMinutes(0, 0, 0);
    const currentHourIndex = hourlyWeather?.hourly?.time?.findIndex(
        (t: string) => new Date(t) >= now,
    );
    const uvIndex = hourlyWeather?.hourly?.uv_index?.[currentHourIndex];
    return (
        <div className="flex flex-col bg-blue-200 rounded-2xl md:max-w-sm lg:max-w-md">
            <h2 className="text-3xl my-3 text-center sm:text-4xl">Currently in {displayAddress}</h2>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="flex items-center justify-around">
                        <img
                            src={getIcon(
                                getWeatherDescription(
                                    weatherData?.current?.weather_code,
                                    cur?.is_day,
                                ).icon,
                            )}
                            className="w-36 h-36 sm:w-42 sm:h-42 bg-sky-600 rounded-full"
                        />
                        <div className="text-7xl sm:text-8xl">
                            {Math.round(cur?.temperature_2m)}
                            {units?.temperature_2m}
                        </div>
                    </div>
                    <p className="text-2xl text-center mb-2 sm:text-3xl">
                        {getWeatherDescription(cur?.weather_code, cur?.is_day)?.description}
                    </p>
                </div>

                <div className="flex flex-col items-center p-5 gap-1">
                    <div className="flex gap-1">
                        <CurrentInfoCard
                            data={cur?.relative_humidity_2m}
                            unit={units?.relative_humidity_2m}
                            description={"Humidity"}
                        />
                        <CurrentInfoCard
                            data={Math.round(cur?.apparent_temperature)}
                            unit={units?.apparent_temperature}
                            description={"Feels Like"}
                        />
                    </div>

                    <div className="flex gap-1">
                        <CurrentInfoCard
                            data={cur?.cloud_cover}
                            unit={units?.cloud_cover}
                            description={"Cloud Cover"}
                        />
                        <CurrentInfoCard data={Math.round(uvIndex)} description={"UV Index"} />
                    </div>
                    <div className="flex gap-1">
                        <CurrentInfoCard
                            data={cur?.wind_speed_10m}
                            unit={units?.wind_speed_10m}
                            description={"Wind"}
                        />

                        <CurrentInfoCard
                            data={cur?.precipitation_probability}
                            unit={units?.precipitation_probability}
                            description={"Rain Chance"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentCard;
