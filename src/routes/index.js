const router = require('express').Router()
const { Facts } = require('../models/')

router.get('/', async (req, res) => {
  const allFacts = await Facts.list()
    .catch(err => {
      res.status(500).send(err)
    })

  if (!allFacts) {
    res.send('No facts yet')
  } else {
    const random = Math.floor(Math.random() * allFacts.length)
    res.send(`Fact #${allFacts[random].id}: ${allFacts[random].fact}`)
  }
})

router.get('/fact/:id', async (req, res) => {
  const fact = await Facts.read(req.params.id)
    .catch(err => {
      res.status(500).send(err)
    })

  if (!fact) {
    res.send('Fact not found')
  } else {
    res.send(`Fact #${fact.id}: ${fact.fact}`)
  }
})

router.post('/fact/', async (req, res) => {
  const fact = await Facts.create(req.body)
    .catch(err => {
      res.status(500).send(err)
    })

  res.send(`Fact ${fact.id} created`)
})

router.delete('/fact/:id', async (req, res) => {
  const fact = await Facts.delete(req.params.id)
    .catch(err => {
      res.status(500).send(err)
    })
  res.send(`Fact ${req.params.id} deleted`)
})

module.exports = router
