import { formatTime } from "../utils/formatTime";
import { getIcon } from "../utils/getIcon";
import { getWeatherDescription } from "../utils/getWeatherDescription";

function HourlyInfoCard({ icon, temp, condition, time, day, precipitation }: any) {
    return (
        <div className="flex flex-col p-1 w-full bg-sky-100 text-center border border-gray-400 rounded-xl w-32 mb-1">
            <div>{formatTime(time)}</div>
            <div className="flex">
                <img
                    src={getIcon(icon)}
                    alt="weather forecast icon"
                    className="w-16 h-16 bg-sky-400 rounded-4xl"
                />
                <div className="flex gap-1 items-center">
                    <div className="text-xl ml-2 mb-2">{temp}</div>
                    <div className="flex flex-col">
                        <div>{precipitation} Chance of Rain</div>
                        <div>{getWeatherDescription(condition, day).description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HourlyInfoCard;
