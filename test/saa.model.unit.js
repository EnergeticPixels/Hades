const assert = require('assert');
const expect = require('chai').expect;
const SmallArm = require('../app/models/saa');

describe('Small Arms database -- Adds new Small Arm record', () => {
    
    it('saves a correct formatted record to db', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample',
            description: 'sample boom item',
            pubRef: {
                publication: 'DD Form 626',
                address: './media/dd626.pdf'
            },
            itemMedia: {
                stillURL: './media/a001.jpg',
                stillCaption: 'just another bullet',
                threeDURL: './media/a001.gltf'
            },
            itemRef: {
                pubRef: {
                    'publication': 'military pub 1',
                    'address': '../media/a001.pdf'
                },
                itemSpec: {
                    'publication': 'item spec 1', 
                    'address': '../media/a001spec.pdf'
                },
                munInspect: {
                    'publication': 'mun inspection 1', 
                    'address': '../media/a001inspec.pdf'
                }
            },
            itemPhysical: {
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
            },
            innerPackage: {
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
            },
            outerPackage: {
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
            }
        });
        munitem.save().then(() => {
            //console.log(munitem);
            assert(munitem.isNew === false);
            done();
        });
    });

});

describe('Small Arms database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        munitem = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample2 ',
            description: 'sample boom item',
            pubRef: {
                publication: 'DD Form 626',
                address: './media/dd626.pdf'
            },
            itemMedia: {
                stillURL: './media/a001.jpg',
                stillCaption: 'just another bullet',
                threeDURL: './media/a001.gltf'
            },
            itemRef: {
                pubRef: {
                    'publication': 'military pub 1',
                    'address': '../media/a001.pdf'
                },
                itemSpec: {
                    'publication': 'item spec 1', 
                    'address': '../media/a001spec.pdf'
                },
                munInspect: {
                    'publication': 'mun inspection 1', 
                    'address': '../media/a001inspec.pdf'
                }
            },
            itemPhysical: {
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
            },
            innerPackage: {
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
            },
            outerPackage: {
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
            }
        });
        munitem.save().then(() => {
            SmallArm.findOne({ dodic: '001a' })
                .then((result) => {
                    //console.log(result);
                    assert(result.dodic === '001a');
                    assert(result.pubRef.publication === 'DD Form 626');
                    assert(result.itemRef.itemSpec.publication === 'item spec 1');
                    assert(result.itemMedia.stillCaption === 'just another bullet');
                    assert(result.itemPhysical.primer === 'Amonium Nitrate && Magnesium flake');
                    assert(result.innerPackage.material === 'cardboard');
                    assert(result.outerPackage.volumeUnit === 'cubic feet');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        munitem1 = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample1 ',
            description: 'sample boom item'
        });
        munitem2 = new SmallArm({
            munType: 'saa',
            dodic: '001b',
            size: '10 mm',
            nomenclature: 'a sample 2 ',
            description: 'sample really big boom item'
        });
        munitem1.save();
        munitem2.save().then(() => {
            SmallArm.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        munitem = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample2 ',
            description: 'sample boom item'
        });
        munitem.save().then(() => {
            SmallArm.findById({ _id: munitem._id })
                .then((result) => {
                    //console.log(result.id);
                    assert(result._id.toString() === munitem._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        munitem1 = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample1 ',
            description: 'sample boom item'
        });
        munitem2 = new SmallArm({
            munType: 'saa',
            dodic: '001b',
            size: '10 mm',
            nomenclature: 'a sample 2 ',
            description: 'sample really big boom item'
        });
        munitem1.save();
        munitem2.save().then(() => {
            SmallArm.findOneAndRemove({ name: '001b' })
                .then((result) => {
                    //console.log(result);
                    SmallArm.findOne({name: '001b'})
                        .then((result) => {
                            assert(result === null);
                            done();
                    });
            });
        });
    });

    it('updates a record', (done) => {
        munitem = new SmallArm({
            munType: 'saa',
            dodic: '001a',
            size: '9 mm',
            nomenclature: 'a sample1 ',
            description: 'sample boom item'
        });
        munitem.save().then(() => {
            SmallArm.findOneAndUpdate({ dodic: '001a'}, {dodic: '999z'})
            .then(() => {
                SmallArm.findOne({ _id: munitem._id }).then((result) => {
                    assert(result.dodic === '999z');
                    done();
                    //console.log(result);
                });
            }); 
        });
    });
});

describe('Small Arms database (error identification)', () => {

    it('indicates error when dodic is not stated', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            size: '9 mm',
            nomenclature: 'a sample',
            description: 'sample boom item'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: dodic: Path `dodic` is required.");
            done();
        });
    });

    it('indicates error when dodic is over 4 characters in length', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '0001A',
            size: '9 mm',
            nomenclature: 'a sample',
            description: 'sample boom item'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: dodic: Path `dodic` (`0001A`) is longer than the maximum allowed length (4).");
            done();
        });
    });

    it('indicates error when size is not a string type', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '001A',
            size: {},
            nomenclature: 'a sample',
            description: 'sample boom item'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: size: Cast to String failed");
            done();
        });
    });

    it('indicates error when nomenclature is not stated', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '001A',
            size: '9 mm',
            description: 'sample boom item'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: nomenclature: Path `nomenclature` is required.");
            done();
        });
    });

    it('indicates error when nomenclature is over 120 characters in length', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '001A',
            size: '9 mm',
            nomenclature: 'Now is the time for all good men to come to the aid of their country. Now is the time for all good men to come to the aid of their country.',
            description: 'sample boom item'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: nomenclature: Path `nomenclature`");
            done();
        });
    });

    it('indicates error when description is not stated', (done) => {
        let munitem = new SmallArm({
            munType: 'saa',
            dodic: '001A',
            size: '9 mm',
            nomenclature: 'a sample'
        });
        munitem.save((errors) => {
            //console.log(errors.message);
            expect(errors.message).to.contain("saaItem validation failed: description: Path `description` is required.");
            done();
        });
    });

});
