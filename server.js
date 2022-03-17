const express = require('express')
const app = express()
const arguments = require('minimist')(process.argv.slice(2))



// app.use(express.json())
// app.use(express.urlencoded( {extended: true} ))

// const logging= (req, res, next) => {
//     console.log(req.body.number)
//     next()
// }



const PORT = arguments.PORT || process.env.PORT || 5000

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
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);

    
})

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
    const headsOrTails = []
    if (flips == null){
      headsOrTails.push(coinFlip())
      return headsOrTails
    }
    for (let x = 0; x < flips; x++){
      var outcome = Math.floor(Math.random() * 2) == 0 ? 'heads' : 'tails'
      headsOrTails.push(outcome)
    }
    
  
    return headsOrTails
  
    }

function countFlips(array) {
  var dict = {};
  dict = {heads: 0, tails: 0}
  
  for (let x = 0; x < array.length; x++){
    if (array[x] == "heads"){
      dict.heads += 1

    }else{
      dict.tails += 1
    }
  }
  if (dict.heads == 0){
    delete dict["heads"]
  } else if (dict.tails == 0){
    delete dict["tails"]
  }
  return dict
}

function flipACoin(call) {
    var flipCoin = {};
    var thisFlip = coinFlip()
    var final_result = ""
    if (call === thisFlip){
      final_result = 'win'
    } else{
      final_result = 'lose'
    }
    
    flipCoin = {call: call, flip: thisFlip, result: final_result}
  
    
    return flipCoin
  
  }






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