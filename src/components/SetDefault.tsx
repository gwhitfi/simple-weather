function SetDefault({ isDefault, onCheck }: any) {
    const savedAddress = localStorage.getItem("default_address");
    const labelText = savedAddress ? "Uncheck to remove saved default" : "Save search as default";

    return (
        <label className="flex gap-2 text-xl mb-7">
            <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => {
                    onCheck(e.target.checked);
                }}
            />
            {labelText}
        </label>
    );
}

export default SetDefault;
