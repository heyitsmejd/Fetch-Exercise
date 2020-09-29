// Set initial variables and imports

const express = require('express')
const app = express()
const axios = require('axios')

// Create our /orders route.. this simply just gets the hardcoded link and returns it as JSON.
app.get('/orders', (req, res) => {
    axios.get('https://fetch-hiring.s3.amazonaws.com/hiring.json').then( resp => {
        // pass our data as json
        res.json(resp.data)
    }).catch(e => {
        console.log(e)
        // if we got an error, throw an error message to the frontend
        res.status(500)
        res.json({error: e})
    })
})

module.exports = {
   path: '/api',
   handler: app
}


