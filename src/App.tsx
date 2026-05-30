import "./index.css";
import WeeklyCard from "./components/ForecastCards/WeeklyCard";
import AddressSearchBox from "./components/AddressSearchBox";
import { useEffect, useState } from "react";
import CurrentCard from "./components/ForecastCards/CurrentCard";
import { getCurrentWeather, getHourlyWeather, getDailyWeather } from "./api/weather";
import HourlyCard from "./components/ForecastCards/HourlyCard";
import { getTimezone } from "./api/timezone";
import SetDefault from "./components/SetDefault";

function App() {
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [searchTimeZone, setSearchTimeZone] = useState<string>("");
    const [isDefault, setIsDefault] = useState(() => {
        return localStorage.getItem("default_address") !== null;
    });

    useEffect(() => {
        const savedAddress = localStorage.getItem("default_address");
        if (savedAddress) {
            setSelectedAddress(JSON.parse(savedAddress));
        }
    }, []);

    useEffect(() => {
        if (isDefault && selectedAddress) {
            localStorage.setItem("default_address", JSON.stringify(selectedAddress));
        } else if (!isDefault) {
            localStorage.removeItem("default_address");
        }
    });

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
        <div className="flex flex-col items-center min-h-screen bg-blue-300 p-5">
            <h1>weather made simple.</h1>
            <AddressSearchBox onAddressSelect={setSelectedAddress} />
            <SetDefault isDefault={isDefault} onCheck={setIsDefault} />
            {selectedAddress && currentWeather && dailyWeather && hourlyWeather && (
                <div className="">
                    <div className="">
                        <CurrentCard
                            weatherData={currentWeather}
                            hourlyWeather={hourlyWeather}
                            timezone={searchTimeZone}
                            location={selectedAddress}
                        />
                        <WeeklyCard weatherData={dailyWeather} />
                    </div>
                    <HourlyCard weatherData={hourlyWeather} timezone={searchTimeZone} />
                </div>
            )}
        </div>
    );
}

export default App;
