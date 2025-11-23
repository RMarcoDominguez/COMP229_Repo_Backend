let config = require('./config');
const mongoose = require('mongoose');

module.exports = function(){

    // const uri = config.MONGO_URI;
    const uri = 'mongodb+srv://admin_db_user:w22F36vK2ftovRer@comp229cluster.8ibb8ky.mongodb.net/?retryWrites=true&w=majority&appName=comp229cluster';
    
    
    if (!uri) {
        console.error('MONGO_URI is not set. Please create config/.env with MONGO_URI or set the environment variable.');
        process.exit(1);
    }

    // use recommended connection options
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
    
}