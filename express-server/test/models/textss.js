'use strict';

var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
var mongooseMock = require('mongoose-mock');
// var expect = chai.expect;
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Texts;
// Testing The Texts Model
describe('Texts Model',function(){

    var id;
    var id2;

    before(function(){  /* jslint ignore:line */
        Texts = require('../../models/Textss');
        var workers = require('../../services/queue/workers');
        var workers1 = require('../../services/queue/workers');
        var workers2 = require('../../services/queue/workers');
        var workers3 = require('../../services/queue/workers');
    });

    describe('Texts CRUDS', function(){
        it('should save data', function(done){
            var mytexts = Texts.create({name: 'femi'});

            mytexts.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read data', function(done){
            var mytexts = Texts.findOne({where: {name: 'femi'}});

            mytexts.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read all data', function(done){
            var mytexts = Texts.findAll();

            mytexts.then(function(res){
                res.should.be.an.array; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update data', function(done){
            var cb = sinon.spy();
            var mytexts = Texts.update({name: 'Olaoluwa'}, { where: {name: 'femi'}});

            mytexts.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should search data', function(done){
            // Search needs more work for more accuracy
            var mytexts = Texts.search('femi');

            mytexts.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete data', function(done){
            var cb2 = sinon.spy();
            var ourtexts = Texts.bulkCreate([{name:'Olaolu'},{name: 'fola'},{name: 'bolu'}]);

            ourtexts.then(function(res){
                return Texts.destroy({where: {name: 'bolu'}});
            }).then(function(res){
                cb2();
                cb2.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add createdAt', function(done){
            var mytexts = Texts.create({name: 'this is for the gods'});

            mytexts.then(function(res){
                id = res._id;
                res.should.have.property('createdAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add updatedAt', function(done){
            var mytexts = Texts.create({name: 'i am a demigod!'});
            mytexts.then(function(res){
                id2 = res._id;
                return Texts.update({name: 'This is the titan'}, {where: {_id: id}});
            })
            .then(function(res){
                return Texts.findOne({where: {name: 'This is the titan'}});
            })
            .then(function(res){
                res.should.have.property('updatedAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should tag database entries properly', async function(){
            var mytexts = await Texts.create({name: 'femi',someOtherStringData: 'stuff'});
            
            return q.Promise(function(resolve, reject) {
            setTimeout(function(){
                Texts.findOne({where: {_id: mytexts._id}})
                .then(function(res){
                    if(typeof res.tags === 'string'){
                        var _tags = res.tags.split(', ');
                        _tags.length.should.equal(2);/* jslint ignore:line */
                    }else{
                        res.tags.length.should.equal(2);/* jslint ignore:line */
                    }
                    
                    resolve(res);
                })
                .catch(function(err){
                    reject(err);
                });
            },3000);
            });
            });

        it('should count returned records', function(done){
            var mytexts = Texts.count({where: {name: 'This is the titan'}});

            mytexts.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and delete', function(done){
            var mytexts = Texts.findOne({where: {_id: id2}});

            var textser = mytexts.then(function(res){
                return res.destroy();
            })
            .then(function(res){
                res.should.be.an('object');
                done();
            });
            
        });

        it('should have transaction object', function(done){
            var mytexts = Texts.transaction.should.exist;  /* jslint ignore:line */
            done();
        });

    });
});
