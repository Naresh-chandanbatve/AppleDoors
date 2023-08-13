import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
dotenv.config();

connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));
// app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);

// app.use("*", function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

app.get('/', (req, res) => {
    res.send("<h1>WELCOME OTO ECOMMERCE APP 2023</h1>")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running at PORT ${PORT}`);
})