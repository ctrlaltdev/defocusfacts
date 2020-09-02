const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./src/db/defocusfacts.db')

module.exports = db
