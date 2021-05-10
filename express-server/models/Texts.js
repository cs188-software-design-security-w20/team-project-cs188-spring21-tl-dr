'use strict';

var db = require('../services/database').sql;

var table = 'Texts';
var debug = require('debug')(table);

// Define schema
var schemaObject = {
    // ++++++++++++++ Modify to your own schema ++++++++++++++++++
    plaintext: {
        type: db._sequelize.TEXT
    },
    url: {
        type: db._sequelize.TEXT
    },
    summarized_text: {
        type: db._sequelize.TEXT
    },
    // ++++++++++++++ Modify to your own schema ++++++++++++++++++
};


schemaObject.owner = {
    type: db._sequelize.STRING
};

schemaObject.createdBy = {
    type: db._sequelize.STRING
};

schemaObject.client = {
    type: db._sequelize.STRING
};

schemaObject.developer = {
    type: db._sequelize.STRING
};

schemaObject.tags = {
    type: db._sequelize.STRING
};

schemaObject._id = {
    type: db._sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
};


// Define the table
var Texts = db.define(table, schemaObject, {
    // Don't really delete data
    // paranoid: true,
    // define indexes here
    indexes:[{
        fields:['tags']
    },
    {
        unique: true,
        fields:['_id']
    }]
});

Texts.associate = function (models) {
    // models.Texts.belongsTo(models.toPop, { foreignKey: 'toPop', sourceKey: '_id' });
};

// Texts.hasMany(Texts, {foreignKey: 'toPop', sourceKey: '_id'});

// Adding hooks
Texts.afterCreate(function(user, options) {
    // Indexing for search
    var ourDoc = user.dataValues;
    ourDoc.isSQL = true;
    ourDoc.model = table;

    // Dump it in the queue
});

Texts.search = function(string){
    return Texts.findAll({
        where: {
            tags: {
                $like: '%'+string
            }
        }
    });
};

Texts.sync();

Texts.transaction = db.transaction;

module.exports = Texts;
// ToDo: Test transactions
