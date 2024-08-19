import express from "express";
import calculateBmi from "./bmiCalc";
import exerCalc from "./exerciseCalc";

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello There Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "malformed parameters" });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { exerDaily, target } = req.body;

  if (!exerDaily || !target) {
    return res.status(400).json({ error: "some parameters missing" });
  }

  if (!Array.isArray(exerDaily) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformed parameters" });
  }

  try {
    const result = exerCalc(exerDaily.map(Number), Number(target));
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: "malformed parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}`);
});
