import express, { Request, Response } from "express";
import { ForecastTodayData } from "~/utils/types/weather";
import { useForecastTodayWeather } from "~/utils/weatherHook";

// Create app instance
const app = express();

// Define JSON as return type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;

// Handle the route that triggers the API call with two string parameters
app.all(
  // "/api/weather_current.ts?lat=:lat&lon=:lon&days=:days",
  "/api/weather_current.ts",
  async (req: Request, res: Response): Promise<ForecastTodayData | null> => {
    try {
      // Extract parameters from the request
      const lat: string = req.query.lat as string;
      const lon: string = req.query.lon as string;
      const days: string | undefined = req.query.days as string | undefined;

      // Make an API call using fetch and pass the parameters
      const apiResponse = await useForecastTodayWeather(
        parseInt(lat ?? "50.633333", 10),
        parseInt(lon ?? "3.066667", 10),
        days ? parseInt(days ?? "2", 10) : undefined,
      );

      if (!apiResponse.ok) {
        throw new Error("API call failed");
      }
      return (await apiResponse.json()) as ForecastTodayData;
      // Parse the response as JSON
    } catch (error) {
      console.error("Error making API call:", error);
      res.status(500).json({ message: "API call failed" });
      return null;
    }
  },
);
app.get("/api", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = { path: "/api", handler: app };
