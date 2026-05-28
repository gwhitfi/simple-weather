export async function location(address: string) {
    console.log("IS DEV:", import.meta.env.DEV);
    const url = import.meta.env.DEV
        ? `https://geocode.googleapis.com/v4/geocode/address/${address}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        : `/.netlify/functions/geocode?address=${encodeURIComponent(address)}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log("GOOGLE GEOCODE API CALL");
    return data ? data : null;
}
