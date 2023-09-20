export default defineEventHandler(async (event) => {
  // const test = await readBody(event);
  const params = getQuery(event) as {
    lat: string;
    lon: string;
    days?: string;
  };
  try {
    if (!params.lat || !params.lon) {
      throw new Error("Missing lat or lon");
    }
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${
      process.env.NUXT_WEATHER_API_KEY ?? ""
    }&q=${params.lat},${params.lon}&days=${
      params.days ?? 2
    }&aqi=no&alerts=no&lang=fr`;
    const result = await $fetch.raw(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json",
      },
    });
    return {
      forecast: result?._data ?? {},
    };
  } catch (error) {
    console.error(error);
    return {
      error: `Error fetching data : ${error}`,
    };
  }
});
