import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { urlsRouter } from "./routes/urlsRouter.js";
import { usersRouter } from "./routes/usersRouter.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(express.json());
app.use(cors());

// Routes / Router urls
app.use('/api/shorturls', urlsRouter);
// Routes / Router user
app.use('/api/user', usersRouter);

// Connect to MongoDB database and after connecting to the database, start listening for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests (after connecting to Database)
        app.listen(PORT, () => {
            console.log(`Server started! Connected to DB and listening on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));