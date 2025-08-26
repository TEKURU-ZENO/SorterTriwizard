import { VercelRequest, VercelResponse } from '@vercel/node';

let houseCapacity = {
  Gryffindor: 30,
  Ravenclaw: 30,
  Hufflepuff: 30,
  Slytherin: 30,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return res.status(200).json(houseCapacity);
  }

  if (req.method === "PUT") {
    const { house, capacity } = req.body as { house: string; capacity: number };
    if (!(house in houseCapacity)) {
      return res.status(400).json({ error: "House not found" });
    }
    houseCapacity[house] = capacity;
    return res.status(200).json(houseCapacity);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
