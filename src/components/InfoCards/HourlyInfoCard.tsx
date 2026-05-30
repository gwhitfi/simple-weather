import { CloudRain, Sun, Wind } from "lucide-react";
import { formatTime } from "../../utils/formatTime";
import { getIcon } from "../../utils/getIcon";
import { getWeatherDescription } from "../../utils/getWeatherDescription";
import { getTempColor } from "../../utils/getTempColor";
import { getUVColor } from "../../utils/getUVColor";

function HourlyInfoCard({ icon, temp, condition, time, day, precipitation, uv, wind }: any) {
    return (
        <div className="flex flex-col bg-sky-800 text-white mb-2 rounded-3xl ">
            <div className="relative group">
                <div className="text-center text-xl">{formatTime(time)}</div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block whitespace-nowrap">
                    {formatTime(time)}
                </div>
            </div>

            <div className="flex mx-2 text-md ">
                <div className="flex items-center gap-1 relative group">
                    <img
                        src={getIcon(icon)}
                        alt="weather forecast icon"
                        className="w-14 h-14 bg-sky-600 rounded-full"
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block whitespace-nowrap">
                        {getWeatherDescription(condition, day).description}
                    </div>

                    <div className={`text-3xl ${getTempColor(parseFloat(temp))}`}>{temp}</div>
                </div>

                <div className="flex items-center justify-end gap-1 w-full text-2xl">
                    <div className="relative group">
                        <div className="flex gap-1 text-sky-300">
                            <CloudRain /> {precipitation}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block whitespace-nowrap">
                            Chance of Rain
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="flex gap-1 text-yellow-300">
                            <Wind /> {wind.replace("/", "")}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block whitespace-nowrap">
                            Wind Speed
                        </div>
                    </div>

                    <div className="relative group">
                        <div className={`flex gap-1 ${getUVColor(parseFloat(uv))}`}>
                            <Sun /> {uv}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 hidden group-hover:block whitespace-nowrap">
                            UV Index
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-lg">
                {getWeatherDescription(condition, day).description}
            </div>
        </div>
    );
}

export default HourlyInfoCard;
