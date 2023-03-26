const express = require('express')
const router = express()

// Defining the routes
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './src/views' })
})

router.post('/generate', (req, res) => {
    console.log(req.body)
})

module.exports = router