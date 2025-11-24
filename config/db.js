let config = require('./config');
const mongoose = require('mongoose');

module.exports = function(){

    // prefer the configured MONGO_URI (from config or environment)
    const uri = config.MONGO_URI || process.env.MONGO_URI;

    if (!uri) {
        console.error('MONGO_URI is not set. Please create config/.env with MONGO_URI or set the environment variable.');
        process.exit(1);
    }

    // connect (no deprecated options). Recent drivers ignore useNewUrlParser/useUnifiedTopology.
    mongoose.connect(uri).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
    
}