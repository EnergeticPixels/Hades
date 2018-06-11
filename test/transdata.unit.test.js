const assert = require('assert');
const expect = require('chai').expect;
const TransData = require('../app/models/transdata');

describe('Transportation Data database (save)', () => {
    
    it('saves a correct formatted TransData record to db', (done) => {
        let reference = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        reference.save().then(() => {
            //console.log(reference);
            assert(reference.isNew === false);
            done();
        });
    });

});

describe('Transportation Data database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let reference = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        reference.save().then((saveresult) => {
            //console.info(saveresult);
            TransData.findOne({ '_id': saveresult._id })
                .then((findresult) => {
                    //console.log(findresult.munInspect.publication);
                    expect(saveresult.qdClassSCG).to.equal('1.4G');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let ref1 = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        let ref2 = new TransData({
            'unosn': 0303,
            'unopsn': 'BFG',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        ref1.save();
        ref2.save().then(() => {
            TransData.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let reference = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        reference.save().then(() => {
            // FindbyId is the same as FindOne method.
            //TransData.findOne({ _id: reference._id })
            TransData.findById({ _id: reference._id })
                .then((result) => {
                    //console.log(reference.id);
                    //console.log(result.id);
                    assert(result.id.toString() === reference._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let ref1 = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        let ref2 = new TransData({
            'unosn': 0303,
            'unopsn': 'BFG',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        ref1.save();
        ref2.save().then(() => {
            TransData.findByIdAndRemove({ '_id': ref1._id })
                .then(() => {
                    TransData.find()
                        .then((result) => {
                            //console.log(result);
                            assert(result.length === 1);
                            done();
                        });
                });
        });
    });

    it('updates a record', (done) => {
        let reference = new TransData({
            'unosn': 0303,
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        reference.save().then((saveresult) => {
            //console.log('preupdate' + saveresult);
            TransData.findByIdAndUpdate( { '_id': saveresult._id }, { 'qdClassSCG': '7' })
                 .then(() => {
                    TransData.findOne().then((verifyresult) => {
                        assert(verifyresult.qdClassSCG === '7');
                        done();
                    });
                });

        });
    });

});

describe('Transportation Data database (error identification)', () => {

    it('indicates error when unosn is not a number', (done) => {
        let reference = new TransData({
            'unosn': 'AAAA',
            'unopsn': 'one dangerous weapon',
            'qdClassSCG': '1.4G',
            'DOTclass': '3',
            'DOTlabel': 'Most Dangerous',
            'DODAC': '0001-0303',
            'drawning': '010101G030303'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("TransData validation failed: unosn: Cast to Number failed");
            done();
        });
    });

});
