function CurrentInfoCard({ data, unit, description }: any) {
    const mobile =
        "flex flex-col p-2 justify-center items-center bg-sky-800 text-white text-lg rounded-xl w-32 ";

    const small =
        "flex flex-col p-2 justify-center items-center bg-sky-800 text-white text-xl rounded-xl w-42 ";
    return (
        <div className={`${mobile} sm:${small}`}>
            <span className="">{description}</span>
            <p>
                {data}
                <span> {unit}</span>
            </p>
        </div>
    );
}

export default CurrentInfoCard;
