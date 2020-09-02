const Table = require('./Table')

const FactStruc = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  fact: 'TEXT'
}

const Facts = new Table('facts')
Facts.define(FactStruc)

Facts.sync()

Facts.create = function (fact) {
  return new Promise((res, rej) => {
    this.db.run('INSERT INTO facts (fact) VALUES(?)', fact, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

Facts.read = function (id) {
  return new Promise((res, rej) => {
    this.db.get('SELECT * FROM facts WHERE id = ?', id, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

Facts.list = function () {
  return new Promise((res, rej) => {
    this.db.all('SELECT * FROM facts', (err, rows) => {
      if (err) rej(err)
      res(rows)
    })
  })
}

Facts.delete = function (id) {
  return new Promise((res, rej) => {
    this.db.run('DELETE FROM facts WHERE id = ?', id, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

module.exports = Facts
