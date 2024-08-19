import express from "express";

const app = express();
const PORT = 3001;

app.get("/api/ping", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("pong...");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
