process.env.NODE_ENV='test';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//import MongodbMemoryServer from 'mongodb-memory-server';
const MongodbMemoryServer = require('mongodb-memory-server').default;
let mongoServer;

before((done) => {
    mongoServer = new MongodbMemoryServer({
        instance: {
            port: 27017,
            dbName: 'ametesting',
            //dbPath: '../db/data',
            debug: true
        },
        debug: true
    });
    mongoServer.getConnectionString().then((mongoUri) => {
        const mongooseOpts = {
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            useMongoClient: true
        };
        return mongoose.connect(mongoUri, mongooseOpts, (err) => {
            console.log(err);
        });
    }).then(() => done());
});

beforeEach((done) => {
    for (let collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(() => {});
    };
    console.info('collection cleared');
    done();
});

after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        console.info('database dropped');
        mongoose.disconnect();
    })
    mongoServer.stop();
    done();
});
