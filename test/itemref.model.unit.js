const assert = require('assert');
const expect = require('chai').expect;
const ItemRef = require('../app/models/itemref');

describe('Item Ref database (save)', () => {
    
    it('saves a correct formatted Item Reference record to db', (done) => {
        let reference = new ItemRef({
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
        });
        reference.save().then(() => {
            //console.log(reference);
            assert(reference.isNew === false);
            done();
        });
    });

});

describe('Item Media database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let reference = new ItemRef({
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
        });
        reference.save().then((saveresult) => {
            //console.info(saveresult);
            ItemRef.findOne({ '_id': saveresult._id })
                .then((findresult) => {
                    //console.log(findresult.munInspect.publication);
                    expect(saveresult.munInspect.publication).to.equal('mun inspection 1');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let ref1 = new ItemRef({
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
        });
        let ref2 = new ItemRef({
            pubRef: {
                'publication': 'military pub 2',
                'address': '../media/a002.pdf'
            },
            itemSpec: {
                'publication': 'item spec 2', 
                'address': '../media/a002spec.pdf'
            },
            munInspect: {
                'publication': 'mun inspection 2', 
                'address': '../media/a002inspec.pdf'
            }
        });
        ref1.save();
        ref2.save().then(() => {
            ItemRef.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let reference = new ItemRef({
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
        });
        reference.save().then(() => {
            // FindbyId is the same as FindOne method.
            //ItemRef.findOne({ _id: reference._id })
            ItemRef.findById({ _id: reference._id })
                .then((result) => {
                    //console.log(result.id);
                    assert(result.id.toString() === reference._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let ref1 = new ItemRef({
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
        });
        let ref2 = new ItemRef({
            pubRef: {
                'publication': 'military pub 2',
                'address': '../media/a002.pdf'
            },
            itemSpec: {
                'publication': 'item spec 2', 
                'address': '../media/a002spec.pdf'
            },
            munInspect: {
                'publication': 'mun inspection 2', 
                'address': '../media/a002inspec.pdf'
            }
        });
        ref1.save();
        ref2.save().then(() => {
            ItemRef.findByIdAndRemove({ '_id': ref1._id })
                .then(() => {
                    ItemRef.find()
                        .then((result) => {
                            //console.log(result);
                            assert(result.length === 1);
                            done();
                        });
                });
        });
    });

    it('updates a record', (done) => {
        let reference = new ItemRef({
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
        });
        reference.save().then((saveresult) => {
            //console.log('preupdate' + saveresult);
            ItemRef.findByIdAndUpdate( { '_id': saveresult._id }, { 'munInspect.publication': 'changed mun' })
                 .then(() => {
                    ItemRef.findOne().then((verifyresult) => {
                        assert(verifyresult.munInspect.publication === 'changed mun');
                        done();
                    });
                });

        });
    });

})
