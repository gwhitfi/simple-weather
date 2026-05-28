declare const process: { env: { [key: string]: string } };

export const handler = async (event: any) => {
    const { lat, lng, timestamp } = event.queryStringParameters;
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
