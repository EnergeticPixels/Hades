const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
process.env.NODE_ENV='test';
const dbConn = 'mongodb://localhost:27017/ametesting';

before((done) => {
    if (mongoose.connection.readyState) return done();
    //if (mongoose.connection.db) return done();
    mongoose.connect(dbConn, {useMongoClient: true});

    mongoose.connection.once('connected', function() {
        console.info('connection ahs been made. now make fireworks');
        done();
    }).on('error', function(error) {
        console.warn('Connection error:', error);
    });
});

beforeEach((done) => {
    for (let collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(() => {});
    };
    //console.info('collection cleared');
    done();
});

after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => {
            //console.log('Mongoose default connection disconnected through app termination');
            //process.exit(0);
            done();
        });
    });
});