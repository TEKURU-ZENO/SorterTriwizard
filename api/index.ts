import express from "express";
import bodyParser from "body-parser";
import { getParticipants, addParticipant, deleteParticipant, updateParticipant } from "./participants";

const app = express();
app.use(bodyParser.json());

// Routes
app.get("/api/participants", getParticipants);
app.post("/api/participants", addParticipant);
app.delete("/api/participants/:id", deleteParticipant);
app.put("/api/participants/:id", updateParticipant);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
