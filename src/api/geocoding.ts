export async function location(address: string) {
    const apiKey = `${import.meta.env.VITE_GOOGLE_API_KEY}`;
    const url = `https://geocode.googleapis.com/v4/geocode/address/${address}?key=${apiKey}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log("GOOGLE GEOCODE API CALL");
    return data ? data : null;
}
