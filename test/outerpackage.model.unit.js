const assert = require('assert');
const expect = require('chai').expect;
const OuterPackage = require('../app/models/outerpackage');

describe('Outer Packaging details database (save)', () => {
    
    it('saves a correct formatted Inner Package details record to db', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save().then(() => {
            //console.log(reference);
            assert(reference.isNew === false);
            done();
        });
    });

});

describe('Outer Package details database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save().then((saveresult) => {
            //console.info(saveresult);
            OuterPackage.findOne({ '_id': saveresult._id })
                .then((findresult) => {
                    //console.log(findresult.munInspect.publication);
                    expect(saveresult.volumeUnit).to.equal('cubic feet');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let ref1 = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        let ref2 = new OuterPackage({
            'material': 'steel',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        ref1.save();
        ref2.save().then(() => {
            OuterPackage.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save().then(() => {
            // FindbyId is the same as FindOne method.
            //OuterPackage.findOne({ _id: reference._id })
            OuterPackage.findById({ _id: reference._id })
                .then((result) => {
                    //console.log(reference.id);
                    //console.log(result.id);
                    assert(result.id.toString() === reference._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let ref1 = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        let ref2 = new OuterPackage({
            'material': 'steel',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        ref1.save();
        ref2.save().then(() => {
            OuterPackage.findByIdAndRemove({ '_id': ref1._id })
                .then(() => {
                    OuterPackage.find()
                        .then((result) => {
                            console.log(result);
                            assert(result.length === 1);
                            done();
                        });
                });
        });
    });

    it('updates a record', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 1,
            'volumeUnit': 'cubic feet'
        });
        reference.save().then((saveresult) => {
            //console.log('preupdate' + saveresult);
            OuterPackage.findByIdAndUpdate( { '_id': saveresult._id }, { 'volume': 3 })
                 .then(() => {
                    OuterPackage.findOne().then((verifyresult) => {
                        assert(verifyresult.volume === 3);
                        done();
                    });
                });

        });
    });

});

describe('Outer Package details database (error identification)', () => {

    it('indicates error when length is not a number', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 'a',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("OuterPackage validation failed: length");
            done();
        });
    });

    it('indicates error when width is not a number', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 'a',
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("OuterPackage validation failed: width:");
            done();
        });
    });

    it('indicates error when height is not a number', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 'a',
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("OuterPackage validation failed: height:");
            done();
        });
    });

    it('indicates error when diameter is not a number', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 'a',
            'diameterUnit': 'cm',
            'volume': 3,
            'volumeUnit': 'cubic feet'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("OuterPackage validation failed: diameter:");
            done();
        });
    });

    it('indicates error when volume is not a number', (done) => {
        let reference = new OuterPackage({
            'material': 'cardboard',
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'volume': 'a',
            'volumeUnit': 'cubic feet'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("OuterPackage validation failed: volume:");
            done();
        });
    });

});
