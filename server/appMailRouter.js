let express = require('express')
let appMailRouter = express.Router()
let db = require('./db')
let nodemailer = require('nodemailer');
let {isEmpty} = require('./fileUpload')
let {newsLetterTemplate,welcomeTemplate,carouselTemplate,multiplePosts,newstedColumn} = require('./mailTemplates')

// configuration settings
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'frontatech@gmail.com',
           pass: 'frontatech22821743'
       }
   });

// sending all the mail templates to the clientside
appMailRouter.get('/mailTemplates', (req,res) =>{
    res.json({templates:[
        {name: 'newsletter', template: 'url'},
        {name: 'carousel', template: 'url'},
        {name: "multiposts", template: 'url'},
        {name: 'nestedColumn', template: 'url'}
    ]})
})

// when a user wants to preview a newsletter
appMailRouter.post('/previewNewsletter', async (req, res) =>{
    const data = req.body
    console.log(data)
    if(data.type === "newsletter"){
        const theme = await newsLetterTemplate(data.params)
        res.json({isError:false,theme:{htmlTemplate:theme,subject:data.params.subject}})
    }
    else if(data.type === "welcome"){
        const theme = await welcomeTemplate(data.params)
        res.json({isError:false,theme:{htmlTemplate:theme,subject:data.params.subject}})
    }
    else if(data.type === "nestedCol"){
        const theme = await newstedColumn(data.params)
        res.json({isError:false,theme:{htmlTemplate:theme,subject:data.params.subject}})
    }
    else if(data.type === "carousel"){
        const theme = await carouselTemplate(data.params)
        res.json({isError:false,theme:{htmlTemplate:theme,subject:data.params.subject}})
    }
    else if(data.type === "multiposts"){
        const theme = await multiplePosts(data.params)
        res.json({isError:false,theme:{htmlTemplate:theme,subject:data.params.subject}})
    }
    else{
        res.status(404).json({error: "Unknown mail template sent"})
    }
})
// when a user want to send the news letter
appMailRouter.post('/send_newsletter',(req,res) =>{
    const data = req.body
    if(isEmpty(data)) return res.status(403).json({error: "You can not send empty body mail, please try again"})
    const mailOptions = {
        from: 'frontatech@gmail.com', // sender address
        to: 'torver.kelvin@gmail.com,preciouschila@gmail.com', // list of receivers
        subject: data.subject, // Subject line
        html: data.htmlTemplate// plain text body
      };
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        res.status(403).json({error: 'Please check your network and try again'})
    else
        console.log(info);
        res.json({success: true, message: "Mail successfully sent"})
    });
})

module.exports = appMailRouter