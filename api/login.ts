// api/login.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: any;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { password } = body;

  console.log("Attempted login:", password, "Expected:", process.env.ADMIN_PASSWORD);

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid password" });
  }
}
