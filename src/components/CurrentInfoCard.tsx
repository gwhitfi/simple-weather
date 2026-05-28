function CurrentInfoCard({ data, unit, description }: any) {
    return (
        <div className="flex flex-col p-3 justify-center items-center bg-sky-100 border border-gray-400 rounded-xl w-32 p-2">
            <span className="text-md">{description}</span>
            <p>
                {data}
                <span> {unit}</span>
            </p>
        </div>
    );
}

export default CurrentInfoCard;
