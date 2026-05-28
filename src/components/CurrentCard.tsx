import { getWeatherDescription } from "../utils/getWeatherDescription";
import { getIcon } from "../utils/getIcon";
import CurrentInfoCard from "./CurrentInfoCard";

function CurrentCard({ weatherData, location }: any) {
    const displayAddress = location?.postalAddress
        ? `${location?.postalAddress?.locality}`
        : `${location?.formattedAddress.split(",")[0]}`;
    const cur = weatherData?.current;
    const units = weatherData?.current_units;
    return (
        <>
            <div className="flex flex-col bg-blue-200 rounded-2xl p-4 self-start w-full">
                <div className="text-lg md:text-3xl lg:text-4xl mb-4 text-center">
                    <p>Currently in {displayAddress}</p>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col justify-start items-center">
                        <div className="-m-10">
                            <img
                                src={getIcon(
                                    getWeatherDescription(
                                        weatherData?.current?.weather_code,
                                        cur?.is_day,
                                    ).icon,
                                )}
                                width="224"
                                height="224"
                            />
                        </div>
                        <div className="text-xl md:text-4xl lg:text-6xl">
                            {Math.round(cur?.temperature_2m)}
                            {units?.temperature_2m}
                        </div>
                        <p className="mt-1 text-center text-md w-25">
                            {getWeatherDescription(cur?.weather_code, cur?.is_day)?.description}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex gap-2">
                            <CurrentInfoCard
                                data={cur?.relative_humidity_2m}
                                unit={units?.relative_humidity_2m}
                                description={"Humidity"}
                            />
                            <CurrentInfoCard
                                data={cur?.precipitation_probability}
                                unit={units?.precipitation_probability}
                                description={"Rain Chance"}
                            />
                        </div>

                        <div className="flex gap-2">
                            <CurrentInfoCard
                                data={cur?.cloud_cover}
                                unit={units?.cloud_cover}
                                description={"Cloud Cover"}
                            />
                            <CurrentInfoCard
                                data={cur?.surface_pressure}
                                unit={units?.surface_pressure}
                                description={"Pressure"}
                            />
                        </div>
                        <div className="flex gap-2">
                            <CurrentInfoCard
                                data={cur?.wind_speed_10m}
                                unit={units?.wind_speed_10m}
                                description={"Wind"}
                            />
                            <CurrentInfoCard
                                data={Math.round(cur?.apparent_temperature)}
                                unit={units?.apparent_temperature}
                                description={"Feels Like"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrentCard;
