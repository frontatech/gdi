let express =  require("express")
let http = require("http");
let cors = require("cors")
let cookieParser = require('cookie-parser')
require('dotenv').config();

// requiring all the routes
let authRouter = require('./authRouter')
// let adminRouter = require('./adminRouter')
let appMailRouter = require('./appMailRouter')
let router =  require('./router')
let app = express()
const PORT = process.env.PORT || 5000
let server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(cookieParser())
app.use('/public',express.static('public'))

// const postComments = [
//     {
//         commentIndex: "post1",
//         comments: [
//             {comment: 'hello', comment_id: 5, date: 200},
//             {comment: 'hello', comment_id: 4, date: 200},
//             {comment: 'hello', comment_id: 3, date: 200},
//             {comment: 'hello', comment_id: 2, date: 200},
//             {comment: 'hello', comment_id: 1, date: 200}
//         ]
//     }
// ]

// const filterComment = postComments.filter(postComment => postComment.commentIndex === "post1")
// console.log(filterComment)

// using all the routes
// app.use(adminRouter)
app.use(authRouter)
app.use(router)
app.use(appMailRouter)
// creating a server connection
server.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})