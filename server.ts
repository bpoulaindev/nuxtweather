import express from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/api/weather_current", async (req, res) => {
  const { weatherApi } = useRuntimeConfig();
  const params = req.query;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${
    weatherApi ?? ""
  }&q=${params?.latitude},${params?.longitude}&days=${
    params?.days ?? 2
  }&aqi=no&alerts=no&lang=fr`;
  // const response = await fetch(url, options);
  const result = await $fetch.raw(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Accept-Encoding": "gzip",
      "content-type": "application/json",
    },
  });
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

export default app;
