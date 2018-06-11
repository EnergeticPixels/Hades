const assert = require('assert');
const expect = require('chai').expect;
const ItemPhysical = require('../app/models/itemphysical');

describe('Item Physical description database (save)', () => {
    
    it('saves a correct formatted ItemPhysical record to db', (done) => {
        let reference = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save().then(() => {
            //console.log(reference);
            assert(reference.isNew === false);
            done();
        });
    });

});

describe('Item Physical description database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let reference = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save().then((saveresult) => {
            //console.info(saveresult);
            ItemPhysical.findOne({ '_id': saveresult._id })
                .then((findresult) => {
                    //console.log(findresult.munInspect.publication);
                    expect(saveresult.primer).to.equal('Amonium Nitrate && Magnesium flake');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let ref1 = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        let ref2 = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Helium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        ref1.save();
        ref2.save().then(() => {
            ItemPhysical.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let reference = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save().then(() => {
            // FindbyId is the same as FindOne method.
            //ItemPhysical.findOne({ _id: reference._id })
            ItemPhysical.findById({ _id: reference._id })
                .then((result) => {
                    //console.log(reference.id);
                    //console.log(result.id);
                    assert(result.id.toString() === reference._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let ref1 = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        let ref2 = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Helium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        ref1.save();
        ref2.save().then(() => {
            ItemPhysical.findByIdAndRemove({ '_id': ref1._id })
                .then(() => {
                    ItemPhysical.find()
                        .then((result) => {
                            //console.log(result);
                            assert(result.length === 1);
                            done();
                        });
                });
        });
    });

    it('updates a record', (done) => {
        let reference = new ItemPhysical({
            'length': 1,
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save().then((saveresult) => {
            //console.log('preupdate' + saveresult);
            ItemPhysical.findByIdAndUpdate( { '_id': saveresult._id }, { 'explosiveWeight': 7 })
                 .then(() => {
                    ItemPhysical.findOne().then((verifyresult) => {
                        assert(verifyresult.explosiveWeight === 7);
                        done();
                    });
                });

        });
    });

});

describe('Item Physical description database (error identification)', () => {

    it('indicates error when length is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': 'a',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: length");
            done();
        });
    });

    it('indicates error when width is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 'a',
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: width:");
            done();
        });
    });

    it('indicates error when height is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 'a',
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: height:");
            done();
        });
    });

    it('indicates error when diameter is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 'a',
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 40,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: diameter:");
            done();
        });
    });

    it('indicates error when propellent weight is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 'a',
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: propellantWeight:");
            done();
        });
    });

    it('indicates error when primer weight is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 1,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 'a',
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 2,
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: primerWeight:");
            done();
        });
    });

    it('indicates error when primary explosive weight is not a number', (done) => {
        let reference = new ItemPhysical({
            'length': '1',
            'lengthUnit': 'cm',
            'width': 1,
            'widthUnit': 'cm',
            'height': 1,
            'heightUnit': 'cm',
            'diameter': 1,
            'diameterUnit': 'cm',
            'propellant': 'C-4',
            'propellantWeight': 1,
            'propellantUnit': 'pounds',
            'primer': 'Amonium Nitrate && Magnesium flake',
            'primerWeight': 20,
            'primerUnit': 'pounds',
            'fuse': 'standard firework fuse',
            'explosive': 'Hydrogen and Cesium',
            'explosiveWeight': 'a',
            'explosiveUnit': 'kilogram'
        });
        reference.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("ItemPhysical validation failed: explosiveWeight:");
            done();
        });
    });

});
