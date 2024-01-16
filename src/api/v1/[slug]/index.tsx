import type { NextApiRequest, NextApiResponse } from "next";
import { AuthLogin } from "@/services";

interface ApiConfig {
  method: "POST" | "GET";
  service: (...args: any[]) => Promise<any>;
}

const API_MAPS: Record<string, ApiConfig> = {
  "auth-login": { service: AuthLogin, method: "POST" },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ...params } = req.method === "POST" ? req.body : req.query;
  const { slug } = req.query;

  try {
    const apiConfig = API_MAPS[slug as string];

    if (
      !slug ||
      !apiConfig ||
      !apiConfig.method ||
      req.method !== apiConfig.method
    ) {
      throw new Error("Invalid API endpoint");
    }
    const result = await apiConfig.service(params);

    res.status(200).json(result);
  } catch (e) {
    console.log("Error on API ->", e);
    res.status(200).json(e);
  }
}
