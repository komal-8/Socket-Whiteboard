import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import userAuth from "./Routes/auth.route.js";
import saveRoute from "./Routes/save.route.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from 'socket.io';
import blogRoute from "./Routes/blog.route.js"



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/whiteboard_')
    .then(() => {
        console.log("Database successfully connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    }
);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
let imageUrl;

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected successfully', socket.id);
    
    // socket.on('drawing',(pathData)=>{ //listen to some event
        // console.log(pathData)
        // for(let i=0;i<data.length;i++){
        //     io.emit('ondraw',{
        //         pathData
        //     })
        // }
     
    // })

    socket.on("draw", (data) => {
        imageUrl = data;
        io.emit("canvasImage", imageUrl);
      });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});


// Routes
app.use('/api/user', userRoute);
app.use('/api/auth', userAuth);
app.use('/api/save',saveRoute)
app.use('/api/blog',blogRoute);


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
