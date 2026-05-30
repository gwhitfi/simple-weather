const BASE_URL = `https://api.open-meteo.com/v1/forecast?`;

function baseParams(addressData: any, timeZone: string) {
    return {
        latitude: addressData.location.latitude,
        longitude: addressData.location.longitude,
        timezone: timeZone,
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        forecast_days: "14",
    };
}

export async function getCurrentWeather(addressData: any, timeZone: string) {
    const params = new URLSearchParams({
        ...baseParams(addressData, timeZone),
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
            "precipitation",
            "precipitation_probability",
            "rain",
            "showers",
            "snowfall",
            "weather_code",
            "cloud_cover",
            "surface_pressure",
        ].join(","),
    });
    const response = await fetch(`${BASE_URL}${params}`);
    console.log("CURRENT WEATHER API CALL");
    return await response.json();
}

export async function getHourlyWeather(addressData: any, timeZone: string) {
    const params = new URLSearchParams({
        ...baseParams(addressData, timeZone),
        hourly: [
            [
                "temperature_2m",
                "precipitation_probability",
                "weather_code",
                "is_day",
                "uv_index",
                "wind_speed_10m",
                "wind_direction_10m",
            ],
        ].join(","),
    });
    const response = await fetch(`${BASE_URL}${params}`);
    console.log("HOURLY WEATHER API CALL");
    return await response.json();
}

export async function getDailyWeather(addressData: any, timeZone: string) {
    const params = new URLSearchParams({
        ...baseParams(addressData, timeZone),
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_max",
        ].join(","),
    });
    const response = await fetch(`${BASE_URL}${params}`);
    console.log("DAILY WEATHER API CALL");
    return await response.json();
}
