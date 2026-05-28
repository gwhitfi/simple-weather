export const handler = async (event: any) => {
    const address = event.queryStringParameters.address;
    const url = `https://geocode.googleapis.com/v4/geocode/address/${address}?key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
