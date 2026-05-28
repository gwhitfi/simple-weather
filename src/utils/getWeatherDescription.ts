interface IconAndDescription {
    description: string;
    icon: string;
}

export function getWeatherDescription(code: number, isDay: number): IconAndDescription {
    const day = isDay ? true : false;

    const descriptions: Record<number, IconAndDescription> = {
        0: { description: "Clear", icon: day ? "clear-day" : "clear-night" },
        1: { description: "Mostly Clear", icon: day ? "mostly-clear-day" : "mostly-clear-night" },
        2: {
            description: "Partly Cloudy",
            icon: day ? "partly-cloudy-day" : "partly-cloudy-night",
        },
        3: { description: "Overcast", icon: day ? "overcast-day" : "overcast-night" },
        45: { description: "Foggy", icon: day ? "fog-day" : "fog-night" },
        48: { description: "Icy Fog", icon: day ? "fog-day" : "fog-night" },
        51: { description: "Light Drizzle", icon: "drizzle" },
        53: { description: "Drizzle", icon: "drizzle" },
        55: { description: "Heavy Drizzle", icon: "drizzle" },
        56: { description: "Light Freezing Drizzle", icon: "sleet" },
        57: { description: "Heavy Freezing Drizzle", icon: "sleet" },
        61: { description: "Light Rain", icon: "rain" },
        63: { description: "Rain", icon: "rain" },
        65: { description: "Heavy Rain", icon: "rain" },
        66: { description: "Freezing Rain", icon: "sleet" },
        67: { description: "Heavy Freezing Rain", icon: "sleet" },
        71: { description: "Light Snow", icon: "snow" },
        73: { description: "Snow", icon: "snow" },
        75: { description: "Heavy Snow", icon: "snow" },
        77: { description: "Snow Grains", icon: "snow" },
        80: { description: "Light Showers", icon: "rain" },
        81: { description: "Showers", icon: "rain" },
        82: { description: "Heavy Showers", icon: "extreme-rain" },
        85: { description: "Snow Showers", icon: "snow" },
        86: { description: "Heavy Snow Showers", icon: "snow" },
        95: { description: "Thunderstorms", icon: "thunderstorms" },
        96: { description: "Thunderstorms w/ Hail", icon: "thunderstorms-hail" },
        99: { description: "Thunderstorms w/ Heavy Hail", icon: "thunderstorms-extreme-hail" },
    };

    return descriptions[code] ?? "Unknown";
}
