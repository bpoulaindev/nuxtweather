import { list } from "@vercel/blob";

export default defineEventHandler(async () => {
  const data = await list();
  console.log(data);
});
