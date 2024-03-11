import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projects.js";
import generalRoutes from "./routes/general.js";
import settingsRoutes from "./routes/settings.js";
import userRoutes from "./routes/user.js";
import rolesRoutes from "./routes/roles.js";
import workspaceRoutes from "./routes/workspace.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/api/projects", projectRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/workspace", workspaceRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
