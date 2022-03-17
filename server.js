const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

const logging= (req, res, next) => {
    console.log(req.body.number)
    next()
}



var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

app.get('/app', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
    
})

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({ 'message': req.params.number })

}
)

app.get('/app/echo/', (req, res) => {
    res.status(200).json( {'message' : req.query.number })
})

app.get('/app/echo/', logging, (req, res) => {
    res.status(200).json( {'message' : req.body.number })
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip' : flip })
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")

})