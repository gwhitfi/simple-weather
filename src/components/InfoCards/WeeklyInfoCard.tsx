import { CloudRain } from "lucide-react";
import { formatDate } from "../../utils/formatTime";
import { getIcon } from "../../utils/getIcon";
import { getTempColor } from "../../utils/getTempColor";
function WeeklyInfoCard({ max_temp, min_temp, precipitation, time, icon }: any) {
    return (
        <div className="flex flex-col bg-sky-800 text-white rounded-3xl items-center p-3 w-28">
            <div className="">{formatDate(time).split(",")[0]}</div>
            <div className=" ">{formatDate(time).split(",")[1]}</div>
            <img src={getIcon(icon)} alt="" className="w-12 h-12 bg-sky-400 rounded-3xl" />
            <div className="flex flex-col justify-center items-center">
                <div className="flex">
                    <span className={`${getTempColor(parseFloat(min_temp))}`}>
                        <img src={getIcon("thermometer-colder")} alt="" className="w-10 h-10" />
                        {min_temp}
                    </span>
                    <span className={`${getTempColor(parseFloat(max_temp))}`}>
                        <img src={getIcon("thermometer-warmer")} alt="" className="w-10 h-10" />
                        {max_temp}
                    </span>
                </div>
                <span>
                    <CloudRain />
                    {precipitation}
                </span>
            </div>
        </div>
    );
}

export default WeeklyInfoCard;
