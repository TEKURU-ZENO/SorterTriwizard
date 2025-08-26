import { VercelRequest, VercelResponse } from '@vercel/node';

let participants: { id: number; name: string; house: string }[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return res.status(200).json(participants);
  }

  if (req.method === "POST") {
    const { name, house } = req.body as { name: string; house: string };
    const newParticipant = { id: Date.now(), name, house };
    participants.push(newParticipant);
    return res.status(201).json(newParticipant);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    participants = participants.filter(p => p.id !== Number(id));
    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
