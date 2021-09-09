const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');
const sessions = require('../data/sessions.json');

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/signIn');
    }
});

sessionsRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://daraclare:01234567890@globomantics.zzh0w.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the Mongo DB');
            const db = client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    }());

});

sessionsRouter.route('/:id').get((req, res) => {
    const url = 'mongodb+srv://daraclare:01234567890@globomantics.zzh0w.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';
    const id = req.params.id;

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the Mongo DB');
            const db = client.db(dbName);
            const session = await db.collection('sessions').findOne({ _id: new ObjectID(id) });
            res.render('session', { session });
        } catch (error) {
            debug(error.stack);
        }
        client.close();
    }());

});

module.exports = sessionsRouter;