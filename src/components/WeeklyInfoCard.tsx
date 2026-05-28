import { formatDate } from "../utils/formatTime";
import { getIcon } from "../utils/getIcon";
import { getWeatherDescription } from "../utils/getWeatherDescription";

function WeeklyInfoCard({ max_temp, min_temp, precipitation, time, conditions, icon }: any) {
    return (
        <div className="flex flex-col p-3 justify-center items-center bg-sky-100 border border-gray-400 rounded-xl w-32 p-2">
            <div className="text-md mb-1">{formatDate(time).split(",")[0]}</div>
            <div className="text-md mb-1">{formatDate(time).split(",")[1]}</div>
            <img src={getIcon(icon)} alt="" className="w-12 h-12 bg-sky-400 rounded-3xl" />
            <div className="text-sm flex flex-col">
                <p>High {max_temp}</p>
                <p>Low {min_temp}</p>
                <p>Rain {precipitation}</p>
                <p>{getWeatherDescription(conditions, 0).description}</p>
            </div>
        </div>
    );
}

export default WeeklyInfoCard;
