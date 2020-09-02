const Table = require('./Table')

const FactStruc = {
  fact: 'TEXT UNIQUE'
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

Facts.read = function (fact) {
  return new Promise((res, rej) => {
    this.db.get('SELECT * FROM facts WHERE fact = ?', fact, (err, row) => {
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

Facts.delete = function (fact) {
  return new Promise((res, rej) => {
    this.db.run('DELETE FROM facts WHERE fact = ?', fact, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

module.exports = Facts
