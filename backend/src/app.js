import express from "express";
import cors from "cors";
import arbitrageRoutes from "./routes/arbitrageRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/arbitrage", arbitrageRoutes);

export default app;
