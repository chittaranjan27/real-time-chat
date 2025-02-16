import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from "path";

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {app, server} from './lib/socket.js'


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});


app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
  }

server.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
    connectDB();
});


