export async function getTimezone(lat: number, lng: number) {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("GOOGLE TIME ZONE API CALL");
    return data.timeZoneId;
}
