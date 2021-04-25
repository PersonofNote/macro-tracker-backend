const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const { pool } = require('./config')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const {body, check, validationResult} = require('express-validator')



const app = express()
const PORT = process.env.PORT || 3000;


const origin = {
    'localhost:8000' : '*',
}



const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // 5 requests,
  })

  // Limit posting comments to 1 request/minute
const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20
  })
 

//app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(limiter)
app.use(cors())


const getUserInfo = (request, response) => {
    console.log(request)
}


app.get('/', (request, response) => {
    response.json({ info: 'Hello, world' })
})


app.get('/user/:id', getUserInfo)

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});