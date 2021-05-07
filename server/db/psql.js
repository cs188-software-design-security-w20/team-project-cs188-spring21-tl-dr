const config = require('../config');
const log = require('../logger');
const Sequelize = require('sequelize');

/** Set up Sequelize instance and connect to Postgres.
 * For development, ensure you have a .env file in the \server directory that defines DB_USERNAME='' and DB_PASSWORD=''.
 */
let options = config.DATABASE_OPTIONS;
options.logging = () => {
  (process.env.NODE_ENV === 'production') ? false : console.log;
};
let sequelize = new Sequelize(config.DATABASE, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, options);
sequelize.authenticate().then(() => {
  console.log(`Connected to database ${config.DATABASE} (${config.DATABASE_OPTIONS.host}:${config.DATABASE_OPTIONS.port}) as user ${config.DATABASE_USERNAME}.`);
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

/** Define data models.
 * All models have createdAt and updatedAt fields automatically inserted. https://sequelize.org/master/manual/model-basics.html#timestamps
 * 
 * For model/column options, see https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init:
 * Model options are under options.___ ; column options are under attributes.column.___
 * 
 * See also https://sequelize.org/master/manual/validations-and-constraints.html for validation options. 
 */
// TODO: populate after Google signin. See https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile 
const User = sequelize.define('User', { // Table will be autonamed 'Users'
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true 
    }
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
}, {});

const Summary = sequelize.define('Summary', { // Table will be autonamed 'Summaries'
  id: {
    type: Sequelize.UUID, // reuse id returned by DeepAI
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  plaintext: {
    type: Sequelize.TEXT
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true // validation is skipped on null values
    }
  },
  summarizedText: {
    type: Sequelize.TEXT
  }
}, {})

// Synchronize models with database. This will create the tables if they do not exist.
// To hard reset tables (drop and recreate), set { force: true }
sequelize.sync({ force: false }).then(() => console.log("Table models synchronized."));

module.exports = {
  _Sequelize: Sequelize,
  db: sequelize,
  User,
  Summary
};