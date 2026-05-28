import "./index.css";
import WeeklyCard from "./components/WeeklyCard";
import AddressSearchBox from "./components/AddressSearchBox";
import { useEffect, useState } from "react";
import CurrentCard from "./components/CurrentCard";
import { getCurrentWeather, getHourlyWeather, getDailyWeather } from "./api/weather";
import HourlyCard from "./components/HourlyCard";
import { getTimezone } from "./api/timezone";

function App() {
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [searchTimeZone, setSearchTimeZone] = useState<string>("");

    useEffect(() => {
        async function fetchWeather() {
            if (!selectedAddress) return;
            const timeZone = await getTimezone(
                selectedAddress.location.latitude,
                selectedAddress.location.longitude,
            );
            setSearchTimeZone(timeZone);

            const [current, hourly, daily] = await Promise.all([
                getCurrentWeather(selectedAddress, timeZone),
                getHourlyWeather(selectedAddress, timeZone),
                getDailyWeather(selectedAddress, timeZone),
            ]);
            setCurrentWeather(current);
            setHourlyWeather(hourly);
            setDailyWeather(daily);
        }
        fetchWeather();
    }, [selectedAddress]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-300 w-500">
            <AddressSearchBox onAddressSelect={setSelectedAddress} />
            {selectedAddress && (
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2 w-115">
                        <CurrentCard weatherData={currentWeather} location={selectedAddress} />
                        <WeeklyCard weatherData={dailyWeather} />
                    </div>
                    <HourlyCard weatherData={hourlyWeather} timezone={searchTimeZone} />
                </div>
            )}
        </div>
    );
}

export default App;
