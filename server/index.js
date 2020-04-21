let express =  require("express")
let http = require("http")
let cors = require('cors')
let router =  require('./router')
let app = express()
// require('dotenv').config();
const PORT = process.env.PORT || 5000
let server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)
app.use(cors())
app.use('/public',express.static('public'))

const marr = [{id: 1},{id:2},{id:3}]
console.log(marr.slice(-1))
console.log(marr)



server.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})