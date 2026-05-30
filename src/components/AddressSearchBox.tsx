import { useState, useEffect } from "react";
import { location } from "../api/geocoding";
import { Search } from "lucide-react";

function AddressSearchBox({ onAddressSelect }: any) {
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (input) {
                const response = (await location(input)) as any;
                setDebouncedInput(response.results);
            } else {
                setDebouncedInput([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className="flex flex-col w-full my-5 md:w-3/4 lg:w-1/2">
            <div className="flex items-center bg-blue-200 text-xl px-5">
                <input
                    name="search"
                    placeholder="Search for your address"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-10 outline-none"
                    autoComplete="off"
                    onBlur={() => setDebouncedInput([])}
                    onFocus={async () => {
                        if (input) {
                            const response = (await location(input)) as any;
                            setDebouncedInput(response.results);
                        }
                    }}
                ></input>
                <Search />
            </div>
            <div className="border border-black rounded-b-xl px-5 text-lg overflow-hidden">
                {debouncedInput?.map((result, index) => {
                    return (
                        <div
                            className="-mx-5 px-5 py-2 truncate whitespace-nowrap hover:bg-blue-400 hover:cursor-pointer hover:font-bold"
                            key={index}
                            onMouseDown={() => {
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
        </div>
    );
}

export default AddressSearchBox;
