import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

// Environment Variables
dotenv.config();

const server = express();
server.use(bodyParser.json());
server.use(cookieParser());

// Test
server.get('/', (req, res) => res.send('Welcome'));

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});

