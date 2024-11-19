import express from 'express';
import http, { METHODS } from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import Document from './models/Document.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

//initializing socket.io
const io = new SocketIO(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

//Connecting to MongoDB
connectDB();

//Initializing middleware
app.use(express.json());
app.use(cors());


//import ROutes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import documentRoutes from './routes/documents.js';

//Defining routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);


//Socket.io Events
io.on('connection', (socket) => {
    socket.on('join-document', async (documentId) => {
        socket.join(documentId);
        const document = await findOrCreateDocument(documentId);

        socket.emit('load-document', document.content);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data) => {
            await Document.findByIdAndUpdate(documentId, { content: data});
        });
    });
});

const findOrCreateDocument = async (id) => {
    if (id == null) return;

    const document = await Document.findById(id);
    if (document) return document;

    return await Document.create({ _id: id, content: '' });
};

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));