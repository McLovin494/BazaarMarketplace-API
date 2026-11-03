import 'dotenv/config';
import express, {type Request, type Response} from "express";
import authRoutes from "./router/auth.js"
import storeRoutes from "./router/store.js"
import productRoutes from "./router/product.js"

const app = express();
const PORT = Number(process.env.PORT) || 5000;
// Parse incoming JSON request bodies
app.use(express.json());
app.use("/api/v1", productRoutes)
app.use("/api/v1", storeRoutes)
app.use("/api/v1/auth", authRoutes)
// Basic health check route
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({status: "ok", message: "Express + TypeScript API is running"});
});

// Example route
app.get("/api", (_req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to your API"});
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
