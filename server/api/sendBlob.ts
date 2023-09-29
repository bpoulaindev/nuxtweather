import { promises as fsPromises, readdirSync } from "fs";
import path from "path";
import { put } from "@vercel/blob";

export default defineEventHandler(async () => {
  const directoryPath = "./assets/px-conversions";
  const files = readdirSync(directoryPath);
  const urls = [];
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const localAssetData = await fsPromises.readFile(filePath);
      const { url } = await put(file, localAssetData, {
        access: "public",
      });
      urls.push(url);
      console.log(`Uploaded: ${file} - URL: ${url}`);
    }),
  );
  const textFilePath = "./assets/background_urls.txt";
  await fsPromises.writeFile(textFilePath, urls.join("\n"));

  console.log(`URLs written to: ${textFilePath}`);

  return { urls };
});
