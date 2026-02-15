import express from 'express';
import configVar from './config/server-config.js';
import connect from './config/database-config.js';
import router from './routes/index.js';
import cors from "cors";

const PORT = configVar.PORT;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:3000", // Next
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get('/home', (req, res) => {
    res.send('<h1>Home</h1>');
});
app.use('/api',router);

const setupAndStartServer = function() {
    app.listen(PORT, async function() {
        console.log(`Server started at PORT ${PORT}`);
        await connect();
        console.log('Mongo db connected');
    });
};

setupAndStartServer();