const mongoose = require('mongoose');
const Db = process.env.DATABASE;

mongoose.connect(Db).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection..'));