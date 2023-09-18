// In serverMiddleware/proxy.js

// Import the necessary modules
import * as URL from "node:url";
import axios from "axios";
import { H3Event, send } from "h3";
// Define your server middleware function
export default function (event: H3Event) {
  const parsedUrl = URL.parse(event?._path, true);
  // Extract query parameters
  const latitude: string = parsedUrl.query?.lat?.[0] ?? "50";
  const longitude: string = parsedUrl.query?.lon?.[0] ?? "3";
  const days: string = parsedUrl.query?.days?.[0] ?? "2";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Accept-Encoding": "gzip",
      "content-type": "application/json",
    },
  };
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${
    process.env.WEATHER_API_KEY ?? ""
  }&q=${latitude},${longitude}&days=${days ?? 2}&aqi=no&alerts=no&lang=fr`;
  // const response = await fetch(url, options);

  // Make a GET request to the weather API
  fetch(url)
    .then((response) => {
      // event.node.res.json(response.data);
      console.log("response", response);
      send(event, response).then(() => {
        console.log("jpp stp");
      });
    })
    .catch((error) => {
      // event.node.res.status(500).json({ error: "API request failed" });
      console.log("error", error);
      send(event, { error: "API request failed" });
    });
}
