import { useState, useEffect } from "react";
import { location } from "../api/geocoding";

function AddressSearchBox({ onAddressSelect }: any) {
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (input) {
                const response = (await location(input)) as any;
                setDebouncedInput(response.results);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className="flex flex-col w-1/2 my-15 border border-blue-400">
            <input
                name="search"
                placeholder="Search for your address"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-indigo-300 w-full h-10 outline-none"
            ></input>
            {debouncedInput?.map((result, index) => {
                return (
                    <div
                        className="flex items-center cursor-pointer bg-indigo-300 w-full h-8 hover:bg-indigo-300"
                        key={index}
                        onClick={() => {
                            onAddressSelect(result);
                            setDebouncedInput([]);
                            setInput("");
                        }}
                    >
                        {result.formattedAddress}
                    </div>
                );
            })}
        </div>
    );
}

export default AddressSearchBox;
