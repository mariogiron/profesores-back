// Server creation and configuration
import http from 'node:http';
import app from './src/app.js';
import connectDB from './src/config/db.js';

// Connect to MongoDB
await connectDB();

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on('listening', () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});
