// api/login.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: "admin" },
        process.env.HWT_SECRET as string,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
