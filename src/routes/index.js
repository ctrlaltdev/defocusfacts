const router = require('express').Router()
const { Facts } = require('../models/')

router.get('/fact/random', async (req, res) => {
  const allFacts = await Facts.list()
    .catch(err => {
      res.status(500).send(err)
    })

  console.info(allFacts)
  if (allFacts.length < 1) {
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
  const fact = await Facts.create(req.body.fact)
    .catch(err => {
      res.status(500).send(err)
    })

  res.send(`Fact created`)
})

router.delete('/fact/:id', async (req, res) => {
  const fact = await Facts.delete(req.params.id)
    .catch(err => {
      res.status(500).send(err)
    })
  res.send(`Fact ${req.params.id} deleted`)
})

module.exports = router
