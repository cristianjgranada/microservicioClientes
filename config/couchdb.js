var nano = require('nano');
console.log('iniciando BD');

module.exports = nano(process.env.COUCHDB_URL || 'http://localhost:5984');