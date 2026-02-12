import express from 'express';
import configVar from './config/server-config.js';
import connect from './config/database-config.js';
import router from './routes/index.js';

const PORT = configVar.PORT;

const app = express();

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
}

setupAndStartServer();