const assert = require('assert');
const expect = require('chai').expect;
const PubRef = require('../app/models/pubref');

describe('Publication Reference database (save)', () => {
    
    it('saves a correct formatted Publication Reference record to db', (done) => {
        let pub = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        pub.save().then(() => {
            //console.log(pub);
            assert(pub.isNew === false);
            done();
        });
    });

});

describe('Publication Reference database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let pub = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        pub.save().then(() => {
            PubRef.findOne({ publication: 'DD Form 626' })
                .then((result) => {
                    //console.log(result);
                    assert(result.publication === 'DD Form 626');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let pub1 = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        let pub2 = new PubRef({
            publication: 'DD Form 8082',
            address: './media/dd8082.pdf'
        });
        pub1.save();
        pub2.save().then(() => {
            PubRef.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let pub = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        pub.save().then(() => {
            PubRef.findOne({ _id: pub._id })
                .then((result) => {
                    //console.log(result.id);
                    assert(result.id.toString() === pub._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let pub1 = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        let pub2 = new PubRef({
            publication: 'DD Form 8082',
            address: './media/dd8082.pdf'
        });
        pub1.save();
        pub2.save().then(() => {
            PubRef.findOneAndRemove({ 'publication': 'DD Form 626' })
                .then((result) => {
                    //console.log(result);
                    PubRef.findOne({ 'publication': 'DD Form 626' })
                        .then((result) => {
                            //console.log(result);
                            assert(result === null);
                            done();
                    });
            });
        });
    });

    it('updates a record', (done) => {
        let pub = new PubRef({
            publication: 'DD Form 626',
            address: './media/dd626.pdf'
        });
        pub.save().then(() => {
            PubRef.findOneAndUpdate({ publication: 'DD Form 626' }, { publication: 'DA 49' })
            .then(() => {
                PubRef.findOne({ '_id': pub._id }).then((result) => {
                    assert(result.publication === 'DA 49');
                    done();
                    //console.log(result);
                });
            }); 
        });
    });

    // modifying all records
    /*it('increments weight by 1', (done) => {
        MunitionItem.update({}, { $inc: { weight: 1 }})
            .then(() => {
                MunitionItem.findOne({name: 'Mario'})
                    .then((record) => {
                        assert(record.weight === 51);
                        done();
                });
            });
    });*/

});