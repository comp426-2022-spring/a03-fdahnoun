const express = require('express')
const app = express()



// app.use(express.json())
// app.use(express.urlencoded( {extended: true} ))

// const logging= (req, res, next) => {
//     console.log(req.body.number)
//     next()
// }



const PORT = process.env.PORT || 5000

// Start an app server
const server = app.listen(PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',PORT))
});

// function coinFlip() {
//     return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
// }

app.get('/app/', (req, res) => {
// Respond with status 200
    res.statusCode = 200;
// respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode)
    
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

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')

})