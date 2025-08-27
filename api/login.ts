// /api/login.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid password" });
  }
}
