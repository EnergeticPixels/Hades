const assert = require('assert');
const expect = require('chai').expect;
const ItemMedia = require('../app/models/itemmedia');

describe('Item Media database (save)', () => {
    
    it('saves a correct formatted ItemMedia record to db', (done) => {
        let visual = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        visual.save().then(() => {
            //console.log(visual);
            assert(visual.isNew === false);
            done();
        });
    });

});

describe('Item Media database (finds, removes, updates)', () => {

    it('find a record', (done) => {
        let visual = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        visual.save().then(() => {
            ItemMedia.findOne({ stillURL: './media/a001.jpg' })
                .then((result) => {
                    //console.log(result);
                    assert(result.stillURL === './media/a001.jpg');
                    done();
                });
        });
    });
        
    it('finds all records', (done) => {
        let visual1 = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        let visual2 = new ItemMedia({
            stillURL: './media/a002.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a002.gltf'
        });
        visual1.save();
        visual2.save().then(() => {
            ItemMedia.find()
                .then((result) => {
                    //console.log(result);
                    assert(result.length === 2);
                    done();
                });
        });
    });

    it('find a record by id', (done) => {
        let visual = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        visual.save().then(() => {
            ItemMedia.findOne({ _id: visual._id })
                .then((result) => {
                    //console.log(result.id);
                    assert(result.id.toString() === visual._id.toString());
                    done();
                });
        });
    });

    it('removes a record', (done) => {
        let visual1 = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        let visual2 = new ItemMedia({
            stillURL: './media/a002.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a002.gltf'
        });
        visual1.save();
        visual2.save().then(() => {
            ItemMedia.findOneAndRemove({ stillURL: './media/a001.jpg' })
                .then((result) => {
                    //console.log(result);
                    ItemMedia.findOne({ stillURL: './media/a001.jpg' })
                        .then((result) => {
                            assert(result === null);
                            done();
                    });
            });
        });
    });

    it('updates a record', (done) => {
        let visual = new ItemMedia({
            stillURL: './media/a001.jpg',
            stillCaption: 'just another bullet',
            threeDURL: './media/a001.gltf'
        });
        visual.save().then(() => {
            ItemMedia.findOneAndUpdate({ stillURL: './media/a001.jpg' }, { stillURL: './media/b001.jpg' })
            .then(() => {
                ItemMedia.findOne({ _id: visual._id }).then((result) => {
                    assert(result.stillURL === './media/b001.jpg');
                    done();
                    //console.log(result);
                });
            }); 
        });
    });

});
