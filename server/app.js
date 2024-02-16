const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5000;
require('./Db/conn');
const user = require('./model/userSchema')
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Specify the methods you want to allow
        // Enable sending cookies from frontend to backend
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust the origin if needed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(require('./router/auth'));
const middleware = (req, res, next) => {
    console.log('hello from middleware');
    next();
};

// Middleware usage
app.use(middleware);


app.listen(PORT, () => {
    console.log(`server listening at port no ${ PORT }`);
});