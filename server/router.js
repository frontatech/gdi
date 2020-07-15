let express = require('express')
let router = express.Router()
let db = require('./db')
let slugify =  require('slugify')
let paystack = require('paystack')('sk_test_14199c12c5c6aeadacf3819c05238fb6a65d84e4');
let {handleImageFileUpload,isEmpty} = require('./fileUpload')
let {verifyPaystackPayment, logError,removeUploadedFile,removeUploadedFiles} = require('./helper')

// getting all the admin members
router.get("/allAdminUsers",(req,res)=>{
    console.log('request all admins')
    let sql = "SELECT * FROM users; SELECT COUNT(*) as total FROM users"
    db.query(sql,(err, result) =>{
        if(err){
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            let admins = result[0]
            admins = admins.map(result => ({ id: result.id, fullName: result.full_name, username: result.username, fbLink: result.fb_link, instalink: result.instalink, twitterLink: result.twitter_link, linkedin: result.linkedin, email: result.email, status: result.status, role: result.role, total_posts: result.total_posts } ))
            return res.json({admins,total:result[1][0].total})
        }
        return res.json({message: "Sorry no member found yet"})
        
    })
    
})

router.patch("/admin/block/:member_id",(req, res) =>{
    console.log(req.params.member_id)
    console.log(req.body)
    const member = req.body.member
    const user = req.body.user
    if(member.id === user._id || member.role === user.role || isNaN(req.params.member_id) ||member.role === "ceo"){
        return res.status(403).json({error: "You're not permitted to carry such operation"})
    }
    const sql = "UPDATE users SET ? WHERE id = ?" 
    db.query(sql,[{status:member.status},member.id], (err, result) =>{
        if(err){
            return res.status(500).json({error: "Sorry an error occured, trying to execute command"})
        }
        return res.json({message: "User blocked successfully",member})
    })
})
// chnage admin role
router.patch("/admin/update/:member_id",(req, res) =>{
    console.log(req.params.member_id)
    console.log(req.body)
    const member = req.body.member
    const user = req.body.user
    if(member.id === user._id || member.role === user.role || isNaN(req.params.member_id) || member.role === "ceo"){
        return res.status(403).json({error: "You're not permitted to carry such operation"})
    }
    const sql = "UPDATE users SET ? WHERE id = ?" 
    db.query(sql,[{role:member.role},member.id], (err, result) =>{
        if(err){
            return res.status(500).json({error: "Sorry an error occured, trying to execute command"})
        }
        return res.json({success: true,message: "User role updated successfully",member})
    })
})

// deleting an admin member
router.delete("/admin/delete",(req, res) =>{
    console.log(req.query)
    const currentAdmin = JSON.parse(req.query.user)
    const member = JSON.parse(req.query.member)
    console.log(currentAdmin.role)
    if(currentAdmin.role === "ceo" && member.role !== "ceo" || currentAdmin.role === "super" && member.role !== "ceo" || currentAdmin.role === "super" && member.role !== "super"){
        const sql = "DELETE FROM users WHERE id = ?" 
        db.query(sql,[member.id], (err, result) =>{
            if(err){
                console.log('error')
                return res.status(500).json({error: "Sorry an error occured, trying to execute command"})
            }
            console.log('success')
            return res.json({message: "User deleted successfully",member})
        })
    }
    else{
        console.log("error fialed")
        return res.status(403).json({error: "Sorry, you're not permitted to carry out such operation"})
    }    
})

// adding new event
// adding an event post to database
const EVENT_DIR = "./public/event_images/";
const EVENT_FILENAME = "fileToUpload";
const EVENT_SIZE = 1
const acceptEventFile = handleImageFileUpload(EVENT_DIR,EVENT_FILENAME,EVENT_SIZE)
router.post('/addevent', acceptEventFile.fileUpload, (req,res) =>{
    let eventStatus = false
    let isError = false
    console.log(req.files)
    const fileurl = req.protocol + '://'+ req.get('host')
    let eventBg = `${fileurl}/${req.files[0].path}`
    let localUrl = EVENT_DIR + req.files[0].filename
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    if(isEmpty(data))return res.status(403).json({eventStatus,contentError:"Sorry you are not permitted to add data"})
    if(data.eventTitle === "") isError = true
    if(data.eventContent === "") isError =  true
    if(data.eventDescript === "") isError = true
    if(data.eventAuthor === "") isError = true 
    if(data.eventStartDate === "") isError =true
    if(data.eventEndDate === "") isError = true
    if(data.eventTime === "") isError = true
    if(data.eventTags === "") isError = true
    if(isError){
        // else remove the uploaded file
        return removeUploadedFile(res, localUrl, 'error', {message:"Make sure you entered all fields",postStatus})
    }
    else{
        let event_slug = slugify(data.eventTitle,{lower:true,strict:true}).trim()
        let event = {event_author: data.eventAuthor, event_content: data.eventContent, event_descript: data.eventDescript, event_title: data.eventTitle, event_date: new Date(), event_slug, event_bg: eventBg, event_start_date: data.eventStartDate, event_end_date: data.eventEndDate, event_tags:data.eventTags,event_expired:1,event_time: data.eventTime}
        console.log(event_slug)
        let sql = "INSERT INTO events SET ?"
        db.query(sql, event, (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({eventStatus,contentError:"Sorry an error occured trying to add event"})
            }
            eventStatus = true
            event.event_id = result.insertId
            return res.json({message: 'Event Added Successfully',eventStatus,event})
        })
        
    }
})

// getting all the events
router.get("/allEvents",(req,res)=>{
    let sql = "SELECT * FROM events ORDER BY event_id desc LIMIT 40;SELECT COUNT(*) as total FROM events"
    db.query(sql,(err, result) =>{
        if(err){
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            return res.json({events:result[0],total:result[1][0].total})
        }
        return res.status(400).json({message: "Sorry no post yest"})
        
    })
    
})
// updating post background picture
router.post('/updateEventBg', async (req,res) =>{
    await acceptEventFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({error: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let newLocalUrl = EVENT_DIR + req.files[0].filename
        let event_bg = fileurl + '/public/event_images/' +req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log('my event update bg data is ',data)
        const oldLocalUrl = EVENT_DIR + data.oldEventBg.split('event_images/')[1]
        console.log('old',oldLocalUrl)
        console.log('new',event_bg)
        let sql = "UPDATE events SET event_bg = ? WHERE event_id = ?"
        db.query(sql,[event_bg, data.event_id], (err, result) =>{
        console.log(err)
        if(err){
            return removeUploadedFile(res,newLocalUrl,'error',{isError:true,error:"Sorry an error occured and command aborted. Please contact admin"})
        }
        // remove old picture if success
            return removeUploadedFile(res,oldLocalUrl,'success',{isError:false,message: 'Event Cover Picture Updated Successfully',event:{event_bg,event_id:data.event_id}})
        })
    })
})

// updating event content
router.post('/updateEvent', (req,res) =>{
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    if(isEmpty(data))return res.status(400).json({error:"Sorry you are not permitted to add data",isError:true})
    console.log(data)
    if(data.eventContent === "") isError =  true
    if(data.eventTitle === "") isError = true
    if(data.eventDescript === "") isError = true
    if(data.eventTags === "") isError = true
    if(data.eventStartDate === "") isError = true
    if(data.eventEndDate === "") isError = true
    if(parseInt(data.eventId) === 0) isError = true
    if(isError){
        // else remove the uploaded file
        return res.status(400).json({message:"Make sure you entered all fields",isError:true})
    }
    else{
        let sql = "UPDATE events SET event_title = ?, event_descript = ?, event_tags = ?, event_content = ?, event_start_date = ?, event_end_date = ?, event_time = ? WHERE event_id = ?"
        db.query(sql, [data.eventTitle, data.eventDescript, data.eventTags,data.eventContent, data.eventStartDate, data.eventEndDate, data.eventTime, data.eventId], (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({error:"Sorry an error occured trying to update post, try again"})
            }
            return res.json({message: 'Event Updated Successfully',isError,event:{event_id: data.eventId, event_content: data.eventContent, event_descript: data.eventDescript, event_tags: data.eventTags, event_title: data.eventTitle, event_start_date: data.eventStartDate, event_end_date: data.eventEndDate, event_time: data.eventTime}})
        })
    }
    
})
// deleting an event from the database
router.delete("/events/:eventId",(req,res)=>{
    console.log('event delete request arrived')
    console.log(req.params.eventId)
    const eventId = parseInt(req.params.eventId)
    if(!isNaN(eventId)){
        let sql = "DELETE  FROM events WHERE event_id = ?"
        db.query(sql,[eventId],(err, result) =>{
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred"})
            }
            console.log(result)
            return res.json({success:true,eventId,message: "Event deleted successfully"})
        })
    }
    else{
        return res.status(401).json({error: "Sorry, an error occurred, invalid credentials sent"})
    }
    
})

// adding new event
// adding an event post to database
const REQUEST_DIR = "./public/request_images/";
const REQUEST_FILENAME = "fileToUpload";
const REQUEST_SIZE = 7
const acceptRequestFile = handleImageFileUpload(REQUEST_DIR,REQUEST_FILENAME,REQUEST_SIZE)
router.post('/addRequest', acceptRequestFile.fileUpload, (req,res) =>{
    let reqStatus = false
    let isError = false
        console.log(req.files)
        const fileurl = req.protocol + '://'+ req.get('host')
        let requestBg = `${fileurl + '/' +req.files[0].path}`
        let localUrl = REQUEST_DIR + req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        if(isEmpty(data))return res.status(400).json({reqStatus,contentError:"Sorry you are not permitted to add data"})
        if(data.requestTitle === "") isError = true
        if(data.requestContent === "") isError =  true
        if(data.requestDescript === "") isError = true
        if(data.requestAuthor === "") isError = true 
        if(data.requestTags === "") isError = true
        if(isNaN(data.requestTargetAmount) || data.requestTargetAmount.toString() === "") isError =true      
        if(isError){
            // else remove the uploaded file
            return removeUploadedFile(res, localUrl, 'error', {message:"Make sure you entered all fields",postStatus})
        }
        else{
            let req_slug = slugify(data.requestTitle,{lower:true,strict:true}).trim()
            let request = {req_author: data.requestAuthor, req_content: data.requestContent, req_descript: data.requestDescript, req_title: data.requestTitle, req_date: new Date(), req_Amount: data.requestTargetAmount, req_tags: data.requestTags, req_slug, req_bg: requestBg,req_expired:0}
            console.log(req_slug)
            let sql = "INSERT INTO causes SET ?"
            db.query(sql, request, (err, result) =>{
                console.log(err)
                if(err){
                    // logError(db,{tableType: "posts",message:err.message})
                    return res.status(500).json({reqStatus,error:"Sorry an error occured trying to add post"})
                }
                reqStatus = true
                request.req_id = result.insertId
                return res.json({message: 'Request Added Successfully',reqStatus, request})
            })
            
        }
})

// adding a new member to database
const MEMBER_DIR = "./public/member_images/";
const MEMBER_FILENAME = "passport";
const MEMBER_SIZE = 7
const acceptMemberFile = handleImageFileUpload(MEMBER_DIR,MEMBER_FILENAME,MEMBER_SIZE)
router.post("/addMember", async (req,res)=>{
    console.log('add Member request arrived')
    let isError = false
    await acceptMemberFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({reqStatus,message: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let passport = fileurl + '/member_images/' +req.files[0].filename
        let localUrl = MEMBER_DIR + req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        if(data.surname === '') isError = true
        if(data.firstName === '') isError = true
        if(data.lastName === '') isError = true
        if(data.gender === '') isError = true
        if(data.marital === '') isError = true
        if(data.phone === '') isError = true
        if(data.email === '') isError = true
        if(data.address === '') isError = true
        if(data.state === '') isError = true
        if(data.lga === '') isError = true
        if(data.nationality === '') isError = true
        if(data.dob === '') isError = true
        if(data.primary === '') isError = true
        if(data.primaryQua === '') isError = true
        if(data.primaryDate === '') isError = true
        if(data.secondary === '') isError = true
        if(data.secondaryQua === '') isError = true
        if(data.secondaryDate === '') isError = true
        // if(data.tertiaryOne === '') isError = true
        // if(data.tertiaryOneQua === '') isError = true
        // if(data.tertiaryOneDate === '') isError = true
        // if(data.tertiaryTwo === '') isError = true
        // if(data.tertiaryTwoQua === '') isError = true
        // if(data.tertiaryTwoDate === '') isError = true
        // if(data.tertiaryThree === '') isError = true
        // if(data.tertiaryThreeQua === '') isError = true
        // if(data.tertiaryThreeDate === '') isError = true
        if(data.discipline === '') isError = true
        // if(data.ngoOne === '') isError = true
        // if(data.positionOne === '') isError = true
        // if(data.responsibilityOne === '') isError = true
        // if(data.ngoDateOne === '') isError = true
        // if(data.ngoTwo === '') isError = true
        // if(data.positionTwo === '') isError = true
        // if(data.responsiblityTwo === '') isError = true
        // if(data.ngoDateTwo === '') isError = true
        if(isError){
            // else remove the uploaded file
            return removeUploadedFile(res, localUrl, 'error', {error:"Make sure you entered the required fields",isError})
        }
        let member = {
            surname: data.surname, 
            firstName: data.firstName, 
            lastName: data.lastName, 
            gender: data.gender, 
            marital: data.marital, 
            phone: data.phone, 
            email: data.email, 
            address: data.address, 
            state: data.state, 
            lga: data.lga, 
            nationality: data.nationality,
            dob: data.dob, 
            father: data.father, 
            status: 1,
            passport
        }
        let academic = {
            primary_school: data.primary, 
            primary_qua: data.primaryQua,
            primary_date: data.primaryDate, 
            secondary: data.secondary, 
            secondary_qua: data.secondaryQua,
            secondary_date: data.secondaryDate,
            tertiaryOne: data.tertiaryOne,
            tertiaryOne_qua: data.tertiaryOneQua,
            tertiaryOne_date: data.tertiaryOneDate, 
            tertiaryTwo: data.tertiaryTwo, 
            tertiaryTwo_qua:data.tertiaryTwoQua, 
            tertiaryTwo_date: data.tertiaryTwoDate, 
            tertiaryThree: data.tertiaryThree, 
            tertiaryThree_qua: data.tertiaryThreeQua,
            tertiaryThree_date:data.tertiaryThreeDate, 
            discipline: data.discipline
        }
        let experience = {
            ngoOne: data.ngoOne, 
            ngoOne_position: data.positionOne, 
            ngoOne_res:data.responsibilityOne, 
            ngoOne_date:data.ngoDateOne, 
            ngoTwo: data.ngoTwo, 
            ngoTwo_position:data.positionTwo,
            ngoTwo_res: data.responsiblityTwo, 
            ngoTwo_date: data.ngoDateTwo
        }
        let memberData = {...member,...academic,...experience}
        db.beginTransaction((dbErr) =>{
            if(dbErr) return res.status(500).json({isError,error:"Sorry an error occured trying to execute command. Please contact admin"})
            let sql = "INSERT INTO members SET ?"
            db.query(sql, member, (err, result) =>{
                console.log(err)
                if(err){
                    return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
                }
                const member_id = result.insertId
                memberData.member_id = member_id
                academic.member_id = member_id
                experience.member_id = member_id
                let insert = "INSERT INTO academics SET ?;INSERT INTO experience SET ?"
                db.query(insert, [academic,experience], (error, response) =>{
                    if(error){
                        return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
                    }
                    db.commit((insertErr) =>{
                        if(insertErr){
                            db.rollback( () =>{
                                return res.status(500).json({isError,error:"Sorry an error occured trying to add member and we're being notified. Please contact admin"})
                            })
                        }
                        res.json({message: 'Member Added Successfully',isError, member: memberData})
                        db.end()
                    })
                })
                
            })
        
        })
    })
        
    
})


// update member information
router.post("/updateMemberInfo", async (req,res)=>{
    console.log('update Member info request arrived')
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    let member = {
        member_id: data.member_id,
        surname: data.surname, 
        firstName: data.firstName, 
        lastName: data.lastName, 
        gender: data.gender, 
        marital: data.marital, 
        phone: data.phone, 
        email: data.email, 
        address: data.address, 
        state: data.state, 
        lga: data.lga, 
        nationality: data.nationality,
        dob: data.dob, 
        father: data.father, 
    }
    if(data.surname === '') isError = true
    if(data.firstName === '') isError = true
    if(data.lastName === '') isError = true
    if(data.gender === '') isError = true
    if(data.marital === '') isError = true
    if(data.phone === '') isError = true
    if(data.email === '') isError = true
    if(data.address === '') isError = true
    if(data.state === '') isError = true
    if(data.lga === '') isError = true
    if(data.nationality === '') isError = true
    if(data.dob === '') isError = true
    if(isError){
        return res.status(401).json({error:"Make sure you entered the required fields",isError})
    }
    db.beginTransaction((dbErr) =>{
        if(dbErr) return res.status(500).json({isError,error:"Sorry an error occured trying to execute command. Please contact admin"})
        let sql = "UPDATE members SET surname = ?, firstName= ?, lastName= ?, gender = ?, marital = ?, phone = ?, email = ?, address = ?, state = ?, lga = ?, nationality = ?, dob = ?, father = ? WHERE member_id = ?;"
        db.query(sql,
            [data.surname, data.firstName, data.lastName, data.gender, data.marital, data.phone, data.email, data.address, data.state, data.lga, data.nationality, data.dob, data.father, data.member_id], (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
            }
            db.commit((insertErr) =>{
                if(insertErr){
                    db.rollback( () =>{
                        return res.status(500).json({isError,error:"Sorry an error occured trying to add member and we're being notified. Please contact admin"})
                    })
                }
                res.json({message: 'Member Personal Information Updated Successfully',isError,member})
            })
            
        })
    
    }) 
    
})
// update member academic information
router.post("/updateMemberAcademics", async (req,res)=>{
    console.log('update Member request arrived')
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    let member = {
        member_id: data.member_id,
        primary_school: data.primary, 
        primary_qua: data.primaryQua,
        primary_date: data.primaryDate, 
        secondary: data.secondary, 
        secondary_qua: data.secondaryQua,
        secondary_date: data.secondaryDate,
        tertiaryOne: data.tertiaryOne,
        tertiaryOne_qua: data.tertiaryOneQua,
        tertiaryOne_date: data.tertiaryOneDate, 
        tertiaryTwo: data.tertiaryTwo, 
        tertiaryTwo_qua:data.tertiaryTwoQua, 
        tertiaryTwo_date: data.tertiaryTwoDate, 
        tertiaryThree: data.tertiaryThree, 
        tertiaryThree_qua: data.tertiaryThreeQua,
        tertiaryThree_date:data.tertiaryThreeDate, 
        discipline: data.discipline
    }
    if(data.primary === '') isError = true
    if(data.primaryQua === '') isError = true
    if(data.primaryDate === '') isError = true
    if(data.secondary === '') isError = true
    if(data.secondaryQua === '') isError = true
    if(data.secondaryDate === '') isError = true
    if(data.discipline === '') isError = true
    if(isError){
        // else remove the uploaded file
        return res.status(401).json({error:"Make sure you entered the required fields",isError})
    }
    db.beginTransaction((dbErr) =>{
        if(dbErr) return res.status(500).json({isError,error:"Sorry an error occured trying to execute command. Please contact admin"})
        let sql = "UPDATE academics SET primary_school = ?, primary_qua = ?, primary_date = ?, secondary = ?, secondary_qua = ?, secondary_date = ?, tertiaryOne = ?, tertiaryOne_qua = ?, tertiaryOne_date = ?, tertiaryTwo = ?, tertiaryTwo_qua = ?, tertiaryTwo_date = ?, tertiaryThree = ?, tertiaryThree_qua = ?, tertiaryThree_date = ?,discipline = ? WHERE member_id = ?"
        db.query(sql, 
            [data.primary,data.primaryQua,data.primaryDate,data.secondary, data.secondaryQua,data.secondaryDate,data.tertiaryOne,data.tertiaryOneQua,data.tertiaryOneDate,data.tertiaryTwo, data.tertiaryTwoQua, data.tertiaryTwoDate,data.tertiaryThree,data.tertiaryThreeQua,data.tertiaryThreeDate,data.discipline,data.member_id], (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
            }
            db.commit((insertErr) =>{
                if(insertErr){
                    db.rollback( () =>{
                        return res.status(500).json({isError,error:"Sorry an error occured trying to add member and we're being notified. Please contact admin"})
                    })
                }
                res.json({message: 'Member Academic Information Updated Successfully',isError,member})
            })
            
        })
    
    })
        
    
})
router.post("/updateMemberExperience", (req,res)=>{
    console.log('update Member request arrived')
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    let member = {
        member_id: data.member_id,
        ngoOne: data.ngoOne, 
        ngoOne_position: data.ngoOnePosition, 
        ngoOne_res:data.ngoOneResponsibility, 
        ngoOne_date:data.ngoDateOne, 
        ngoTwo: data.ngoTwo, 
        ngoTwo_position:data.ngoTwoPosition,
        ngoTwo_res: data.ngoTwoResponsibility, 
        ngoTwo_date: data.ngoDateTwo
    }
    if(data.ngoOne === '') isError = true
    if(data.positionOne === '') isError = true
    if(data.responsibilityOne === '') isError = true
    if(data.ngoDateOne === '') isError = true
    // if(data.ngoTwo === '') isError = true
    // if(data.positionTwo === '') isError = true
    // if(data.responsiblityTwo === '') isError = true
    // if(data.ngoDateTwo === '') isError = true
    if(isError){
        // else remove the uploaded file
        return res.status(401).json({error:"Make sure you entered the required fields",isError})
    }
    db.beginTransaction((dbErr) =>{
        if(dbErr) return res.status(500).json({isError,error:"Sorry an error occured trying to execute command. Please contact admin"})
        let sql = "UPDATE experience SET ngoOne = ?, ngoOne_position = ?, ngoOne_res = ?, ngoOne_date = ?, ngoTwo = ?, ngoTwo_position = ?, ngoTwo_res = ?, ngoTwo_date = ? WHERE member_id = ?"
        db.query(sql,
            [data.ngoOne, data.ngoOnePosition, data.ngoOneResponsibility, data.ngoDateOne, data.ngoTwo, data.ngoTwoPosition,data.ngoTwoResponsibility, data.ngoDateTwo,data.member_id], (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
            }
            db.commit((insertErr) =>{
                if(insertErr){
                    db.rollback( () =>{
                        return res.status(500).json({isError,error:"Sorry an error occured trying to add member and we're being notified. Please contact admin"})
                    })
                }
                res.json({message: 'Member Experience Updated Successfully',isError,member})
            })
            
        })
    
    })
        
    
})

// adding blog post to database
const PASSPORT_DIR = "./public/member_images/";
const PASSPORT_FILENAME = "passport";
const PASSPORT_SIZE = 7
const acceptPassportFile = handleImageFileUpload(PASSPORT_DIR,PASSPORT_FILENAME,PASSPORT_SIZE)
router.post('/updateMemberPassport', async (req,res) =>{
    await acceptPassportFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({error: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let newLocalUrl = PASSPORT_DIR + req.files[0].filename
        let passport = fileurl + '/public/member_images/' +req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        const oldLocalUrl = PASSPORT_DIR + data.oldPhotoUrl.split('member_images/')[1]
        console.log('old',oldLocalUrl)
        console.log('new',passport)
        let sql = "UPDATE members SET passport = ? WHERE member_id = ?"
        db.query(sql,[passport, data.member_id], (err, result) =>{
        console.log(err)
        if(err){
            return removeUploadedFile(res,newLocalUrl,'error',{isError:true,error:"Sorry an error occured and command aborted. Please contact admin"})
        }
        // remove old picture if success
            return removeUploadedFile(res,oldLocalUrl,'success',{isError:false,message: 'Member Profile Picture Updated Successfully',member:{passport,member_id:data.member_id}})
        })
    })
})

// uploading files to gallery
// adding a new member to database
const GALLERY_DIR = "./public/gallery_images/";
const GALLERY_FILENAME = "galleryFiles";
const GALLERY_SIZE = 10
const acceptGalleryFiles = handleImageFileUpload(GALLERY_DIR,GALLERY_FILENAME,GALLERY_SIZE)
router.post("/uploadToGallery", acceptGalleryFiles.fileUpload, (req, res) =>{
    let data = JSON.parse(JSON.stringify(req.body))
    let isError = false
    const uploadedFiles = req.files
    console.log(uploadedFiles);
    const fileurl = req.protocol + '://'+ req.get('host')
    let localFiles = []
    const filesToUpload = []
    uploadedFiles.forEach(uploadedFile => {
        // get the local file path
        localFiles.push(GALLERY_DIR + uploadedFile.filename)
        // create an array of files to upload
        const fileArray = [`${fileurl}/${uploadedFile.path}`, data.caption, parseInt(data.admin), new Date()]
        // push it to the array files to upload
        filesToUpload.push(fileArray)
    })
    if(isEmpty(data)) isError = true
    if(isNaN(data.admin) || parseInt(data.admin) === 0) isError = true
    if(data.caption === "") isError = true
    if(!isError){
        const insert = "INSERT INTO gallery(file_name,file_caption, file_admin, file_date) VALUES ?"
        db.query(insert,[filesToUpload],(err,result) =>{
            if(err){
                return removeUploadedFiles(localFiles,res)
            }
            console.log(result)
            const insertId = result.insertId
            const photoFiles = filesToUpload.map((photoFile,i) => ({
                src: photoFile[0],
                width: 1,
                height: 1,
                title: photoFile[1],
                file_id: insertId + i
            }) )
            console.log(photoFiles)
            return res.status(200).json({message: "Files uploaded successfully",photoFiles})
        })
    }
    else{
        removeUploadedFiles(localFiles,res)
    }
    
    
}) 
// getting all GDI uploaded photos
router.get("/photoGallery",(req,res)=>{
    let sql = "SELECT * FROM gallery ORDER BY gallery_id desc LIMIT 20;SELECT COUNT(*) as total FROM gallery"
    db.query(sql,(err, result) =>{
        if(err){
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            console.log(result)
            return res.json({photoFiles:result[0],total:result[1][0].total})
        }
        return res.status(400).json({message: "Sorry no post yest"})
        
    })
    
})

// deleting a particular gallery file
router.delete("/deletePhotoFile", (req, res)=>{
    console.log("deletePhotoFile request has arrived")
    console.log(req.query.file)
    let data = JSON.parse(req.query.file)
    const splitFile = data.src.split("gallery_images\\")
    const localUrl = `./public/gallery_images/${splitFile[1]}`
    let deleteFile = "DELETE FROM gallery WHERE gallery_id = ?"
    db.query(deleteFile,[parseInt(data.file_id)],(err, result) =>{
        if(err){
            console.error(err)
            return res.status(500).json({error: "Sorry an error occurred trying to delete this file, maka sure you have permission"})
        }
        return removeUploadedFile(res, localUrl, 'success', {message:"File deleted successfully",success: true,...data})
    })
})

// loading more photos from the database
router.post("/adminLoadMorePhotos",(req,res)=>{
    console.log('request adminLoadMorePhotos arrived')
    console.log(req.body)
    const lastId = parseInt(req.body.lastId)
    if(!isNaN(lastId)){
        console.log(lastId)
        let sql = `SELECT * FROM gallery WHERE gallery_id < ? ORDER BY gallery_id desc LIMIT 40`
        db.query(sql,[lastId],(err, result) =>{
            if(err){
                return res.status(500).json({message: "Sorry, an error occurred"})
            }
            else{
                return res.json({photoFiles:result})
            }
        })
    }
    else{
        return res.status(403).json({message: "Sorry, an error occurred"})
    }
})

// getting all GDI MEMBERS
// let sql = "SELECT * FROM members,academics,experience WHERE members.member_id = academics.member_id AND members.member_id = experience.member_id LIMIT 60;SELECT COUNT(*) as total FROM members"
router.get("/members",(req,res)=>{
    console.log('request arrived')
    let sql = "SELECT * FROM members LIMIT 50;SELECT COUNT(*) as total FROM members"
    db.query(sql,(err, result) =>{
        if(err){
            // logError(db,{tableType: "posts",message:err.message})
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            return res.json({members:result[0],total:result[1][0].total})
        }
        return res.json({message: "Sorry no member found yet"})
        
    })
    
})

// deleting a gdi member
router.delete("/members/:userId",(req,res)=>{
    console.log('members delete request arrived')
    console.log(req.params.userId)
    const userId = parseInt(req.params.userId)
    if(!isNaN(userId)){
        let sql = "DELETE  FROM subscribers WHERE id = ?"
        db.query(sql,[userId],(err, result) =>{
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred"})
            }
            console.log(result)
            return res.json({success:true,userId,message: "Subscriber delted sucessfully"})
        })
    }
    else{
        return res.status(401).json({error: "Sorry, an error occurred, invalid credentials sent"})
    }
    
})

// loading more members from the database
router.get("/loadMoreMembers",(req,res)=>{
    console.log('loadMoreMembers request arrived')
    console.log(parseInt(req.query.lastMember))
    const lastId = parseInt(req.query.lastMember)
    if(!isNaN(lastId)){
        let sql = `SELECT * FROM members WHERE member_id > ? LIMIT 50`
        db.query(sql,[lastId],(err, result) =>{
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred, trying to fetch"})
            }
            else{
                console.log('====================================');
                console.log(result);
                console.log('====================================');
                return res.json({members:result})
            }
        })
    }
    else{
        return res.status(500).json({error: "Sorry, an error occurred"})
    }
})
// fetch all site newsletter subscribers
router.get("/siteSubscribers",(req,res)=>{
    console.log('siteSubscribers request arrived')
    let sql = "SELECT * FROM subscribers LIMIT 50;SELECT COUNT(*) as total FROM subscribers"
    db.query(sql,(err, result) =>{
        if(err){
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            console.log(result)
            return res.json({subscribers:result[0],total:result[1][0].total})
        }
        return res.json({message: "Sorry no member found yet"})
        
    })
    
})
// loading more site subscribers from the database
router.get("/loadMoreSubscribers",(req,res)=>{
    console.log('loadMoreSubscribers request arrived')
    console.log(parseInt(req.query.lastSubscriber))
    const lastId = parseInt(req.query.lastSubscriber)
    if(!isNaN(lastId)){
        let sql = `SELECT * FROM subscribers WHERE id > ? LIMIT 50`
        db.query(sql,[lastId],(err, result) =>{
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred, trying to fetch"})
            }
            else{
                console.log('====================================');
                console.log(result);
                console.log('====================================');
                return res.json({subscribers:result})
            }
        })
    }
    else{
        return res.status(500).json({error: "Sorry, an error occurred"})
    }
})
// deleting a site subscriber
router.delete("/siteSubscribers/:userId",(req,res)=>{
    console.log('siteSubscribers delete request arrived')
    console.log(req.params.userId)
    const userId = parseInt(req.params.userId)
    if(!isNaN(userId)){
        let sql = "DELETE  FROM subscribers WHERE id = ?"
        db.query(sql,[userId],(err, result) =>{
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred"})
            }
            console.log(result)
            return res.json({success:true,userId,message: "Subscriber delted sucessfully"})
        })
    }
    else{
        return res.status(401).json({error: "Sorry, an error occurred, invalid credentials sent"})
    }
    
})
// adding blog post to database
const IMAGE_DIR = "./public/post_images/";
const IMAGE_FILENAME = "fileToUpload";
const INPUT_SIZE = 7
const acceptImageFile = handleImageFileUpload(IMAGE_DIR,IMAGE_FILENAME,INPUT_SIZE)
router.post('/addpost', acceptImageFile.fileUpload, async (req,res) =>{
    let postStatus = false
    let isError = false
        const fileurl = req.protocol + '://'+ req.get('host')
        let postBg = `${fileurl}/${req.files[0].path}`
        let localUrl = IMAGE_DIR + req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        if(isEmpty(data))return res.status(400).json({postStatus,contentError:"Sorry you are not permitted to add data"})
        if(data.postContent === "") isError =  true
        if(data.postTitle === "") isError = true
        if(data.postDescript === "") isError = true
        if(data.postAuthor === "") isError = true 
        if(data.postType === "" || data.postType === "Select Post Type") isError =true
        if(data.postTags === "") isError 
        if(data.postCat === "" || data.postCat === "Select Category") isError = true
        if(isError){
            // else remove the uploaded file
            return removeUploadedFile(res, localUrl, 'error', {message:"Make sure you entered all fields",postStatus})
        }
        else{
            let post_slug = slugify(data.postTitle,{lower:true,strict:true}).trim()
            let post = {post_author: data.postAuthor, post_content: data.postContent, post_descript: data.postDescript, post_title: data.postTitle, post_date: new Date(), post_slug, post_bg: postBg, post_cat: data.postCat, post_type: data.postType, post_tags:data.postTags}
            console.log(post_slug)
            let sql = "INSERT INTO posts SET ?"
            db.query(sql, post, (err, result) =>{
                console.log(err)
                if(err){
                    // logError(db,{tableType: "posts",message:err.message})
                    return res.status(500).json({postStatus,contentError:"Sorry an error occured trying to add post"})
                }
                postStatus = true
                post.post_id = result.insertId
                return res.json({message: 'Post Added Successfully',postStatus, post})
            })
            
        }
})
// updating post content
router.post('/updatePost', (req,res) =>{
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    if(isEmpty(data))return res.status(400).json({error:"Sorry you are not permitted to add data",isError:true})
    console.log(data)
    if(data.postContent === "") isError =  true
    if(data.postTitle === "") isError = true
    if(data.postDescript === "") isError = true
    if(data.postAuthor === "") isError = true 
    if(data.postTags === "") isError = true
    if(parseInt(data.postId) === 0) isError = true
    if(isError){
        // else remove the uploaded file
        return res.status(400).json({message:"Make sure you entered all fields",isError:true})
    }
    else{
        let sql = "UPDATE posts SET post_title = ?, post_descript = ?, post_tags = ?, post_content = ? WHERE post_id = ?"
        db.query(sql, [data.postTitle, data.postDescript, data.postTags,data.postContent, data.postId], (err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({error:"Sorry an error occured trying to update post, try again"})
            }
            return res.json({message: 'Post Updated Successfully',isError,post:{post_id: data.postId, post_content: data.postContent, post_descript: data.postDescript, post_tags: data.postTags, post_title: data.postTitle}})
        })
    }
    
})

// deleting a post from the database
router.delete("/posts/:postId",(req,res)=>{
    console.log('post delete request arrived')
    console.log(req.params.postId)
    const postId = parseInt(req.params.postId)
    if(!isNaN(postId)){
        let sql = "DELETE posts, post_comments FROM posts INNER JOIN post_comments WHERE posts.post_id = post_comments.post_id AND posts.post_id = ?"
        db.query(sql,[postId],(err, result) =>{
            console.log(err)
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred"})
            }
            console.log(result)
            return res.json({success:true,postId,message: "Subscriber delted sucessfully"})
        })
    }
    else{
        return res.status(401).json({error: "Sorry, an error occurred, invalid credentials sent"})
    }
    
})

    
// updating post background picture
router.post('/updatePostBg', async (req,res) =>{
    await acceptImageFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({error: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let newLocalUrl = IMAGE_DIR + req.files[0].filename
        let post_bg = fileurl + '/public/post_images/' +req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        const oldLocalUrl = IMAGE_DIR + data.oldPostBg.split('post_images/')[1]
        console.log('old',oldLocalUrl)
        console.log('new',post_bg)
        let sql = "UPDATE posts SET post_bg = ? WHERE post_id = ?"
        db.query(sql,[post_bg, data.post_id], (err, result) =>{
        console.log(err)
        if(err){
            return removeUploadedFile(res,newLocalUrl,'error',{isError:true,error:"Sorry an error occured and command aborted. Please contact admin"})
        }
        // remove old picture if success
            return removeUploadedFile(res,oldLocalUrl,'success',{isError:false,message: 'Post Cover Picture Updated Successfully',post:{post_bg,post_id:data.post_id}})
        })
    })
})
// getting all the blog posts
router.get("/allPosts",(req,res)=>{
    console.log('request arrived')
    let sql = "SELECT * FROM posts ORDER BY post_id desc LIMIT 40;SELECT COUNT(*) as total FROM posts"
    db.query(sql,(err, result) =>{
        if(err){
            // logError(db,{tableType: "posts",message:err.message})
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            return res.json({posts:result[0],total:result[1][0].total})
        }
        return res.json({message: "Sorry no post yest"})
        
    })
    
})

// getting all the blog posts
router.get("/posts",(req,res)=>{
    console.log('request arrived')
    let sql = "SELECT * FROM posts ORDER BY post_id desc LIMIT 12;SELECT COUNT(*) as total FROM posts"
    db.query(sql,(err, result) =>{
        if(err){
            logError(db,{tableType: "posts",message:err.message})
            return res.status(404).json({message: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            return res.json({posts:result[0],total:result[1][0].total})
        }
        return res.json({message: "Sorry no post yest"})
        
    })
    
})
// loading more events from the database
router.post("/adminLoadMoreEvents",(req,res)=>{
    console.log('request arrived')
    console.log(req.body)
    const lastId = parseInt(req.body.lastId)
    if(!isNaN(lastId)){
        console.log(lastId)
        let sql = `SELECT * FROM events WHERE event_id < ? ORDER BY event_id desc LIMIT 40`
        db.query(sql,[lastId],(err, result) =>{
            if(err){
                return res.status(500).json({message: "Sorry, an error occurred"})
            }
            else{
                return res.json({events:result})
            }
        })
    }
    else{
        return res.status(403).json({message: "Sorry, an error occurred"})
    }
})
// loading more post from the database
router.post("/loadMorePosts",(req,res)=>{
    console.log('request arrived')
    console.log(req.body)
    const lastId = parseInt(req.body.lastId)
    if(!isNaN(lastId)){
        console.log(lastId)
        let sql = `SELECT * FROM posts WHERE post_id < ? ORDER BY post_id desc LIMIT 10`
        db.query(sql,[lastId],(err, result) =>{
            if(err){
                return res.status(500).json({message: "Sorry, an error occurred"})
            }
            else{
                return res.json({posts:result})
            }
        })
    }
    else{
        return res.status(403).json({message: "Sorry, an error occurred"})
    }
})
// loading post comments 
router.post("/loadMoreComments",(req,res)=>{
    console.log('request more comments arrived')
    console.log(req.body)
    const lastId = req.body.lastId
    const postId = req.body.postId
    if(!isNaN(lastId)  && !isNaN(postId)){
        let sql = `SELECT * FROM post_comments WHERE comment_id < ? AND post_id = ? ORDER BY comment_id DESC LIMIT 5`
        db.query(sql,[lastId,postId],(err, result) =>{
            console.log(result)
            if(err){
                return res.status(500).json({error: "Sorry, an error occurred"})
            }
            res.json({comments:result})
        })
    } 
    else{
        return res.status(403).json({message: "Sorry, an error occurred"})
    }
})
// submitting post comment
router.post("/postComment",(req, res) =>{
    const data = req.body
    let status = false;
    const isError = false
    let nameError = emailError = msgError = idError = "";
    if(data.name === "") isError = true
    if(data.email === "") isError = true
    if(data.message === "")  isError = true
    if(isNaN(data.postId)) isError = true
    if(!isError){
        const comment = {name:data.name,email:data.email,comment:data.message,date:new Date(),post_id: data.postId}
        let sql = "INSERT INTO post_comments SET ?; UPDATE posts SET post_comments = post_comments + 1 WHERE post_id = ?"
        db.query(sql,[comment,data.postId],(err, result) =>{
            if(err){
                console.log(err)
                return res.status(500).json({nameError,emailError,msgError:"Sorry an error occurred and we're notified. We will fix it in due course.Thanks",status})
            }
            console.log('comment inserted and post incremented')
            return res.status(200).json({message:"Comment posted successfully",status:true,comment})
        })
    }
    else{
        return res.status(403).json({isError,error:"Make sure all fields are filled"})
    }
    
})
// fetching post comment by an admin
router.get(`/admin/comments/`,(req,res) =>{
    console.log('fetch comment request arrived')
    console.log(req.query)
    const post_id = req.query.post_id
    const type = req.query.type
    const comment_id = req.query.comment_id
    console.log(post_id, type, comment_id)
    if(isNaN(post_id) || isNaN(comment_id) || type === ""){
        return res.status(403).json({error:"Sorry you can not get the comments of an unknown post"})
    }
    if(type === "first"){
        let query = "SELECT * FROM post_comments WHERE post_id = ? ORDER BY comment_id DESC LIMIT 10";
        db.query(query, [post_id], (err, data) =>{
            console.log(data)
            if(err) return res.status(500).json({error: true})
            console.log("first time")
            return res.json({comments: data})
        })
    }
    else{
        let query = "SELECT * FROM post_comments WHERE post_id = ? AND comment_id < ? ORDER BY comment_id DESC LIMIT 10";
        db.query(query, [post_id, comment_id], (err, data) =>{
            console.log(data)
            if(err) return res.status(500).json({error: true})
            console.log("loading more")
            console.log(data)
            return res.json({comments: data})
        })
    }
})

// deleting a particular post comment
router.delete('/admin/comment/:post_id/:comment_id', (req, res) =>{
    const comment_id = parseInt(req.params.comment_id)
    const post_id = parseInt(req.params.post_id)
    console.log(req.params.comment_id)
    if(isNaN(comment_id) || isNaN(post_id)){
        return res.status(403).json({error: "Wrong data sent, maybe you don't permission to perfoerm this operation."})
    }
    let sql = "DELETE  FROM post_comments WHERE comment_id = ?; UPDATE posts SET post_comments = post_comments - 1 WHERE post_id = ?"
    db.query(sql,[comment_id, post_id],(err, result) =>{
        if(err){
            return res.status(500).json({error: "Sorry, an error occurred"})
        }
        console.log(result)
        return res.json({success:true,comment_id,message: "Post comment deleted successfully"})
    })
})
// getting a particular post comments
router.get("/comments/:slug",(req,res) =>{
    const slug = req.params.slug
    if(slug === "")return res.json({error: true})
    let sql = `SELECT * FROM posts WHERE post_slug = ?`
    db.query(sql,[slug], (err, result) =>{
        if(err) return res.json({error: true})
            const postId = result[0].post_id
            let query = "SELECT * FROM post_comments WHERE post_id = ? ORDER BY comment_id DESC LIMIT 5; SELECT COUNT(*) as total FROM post_comments WHERE post_id = ?";
            db.query(query, [postId,postId], (err, data) =>{
                console.log(data)
                if(err) return res.json({error: true})
                if(data.length === 0){
                    res.json({comments: [],totalComments: 0})  
                }
                res.json({comments: data[0],totalComments: data[1][0].total})
            })
    })
})
// getting a particular post
router.get("/post_details/:slug",(req,res) =>{
    const slug = req.params.slug
    if(slug === "")return res.json({error: true})
    let sql = `SELECT * FROM posts WHERE post_slug = "${slug}"`
    db.query(sql, (err, result) =>{
        if(err) return res.json({error: true})
            const postId = result[0].post_id
            let query = "SELECT * FROM post_comments WHERE post_id = ? ORDER BY comment_id DESC LIMIT 5; SELECT COUNT(*) as total FROM post_comments WHERE post_id = ?";
            db.query(query, [postId,postId], (err, data) =>{
                console.log(data)
                if(err) return res.json({error: true})
                if(data.length === 0){
                    res.json({post:result, comments: [],totalComments: 0})  
                }
                res.json({post:result, comments: data[0],totalComments: data[1][0].total})
            })
    })
})


//adding a subscriber to the database
router.post('/newsletter', (req,res) =>{
    let data = JSON.parse(JSON.stringify(req.body))
    if(data.email.trim() !== ""){
        let query = `SELECT * FROM subscribers WHERE email = ?`
        db.query(query, [data.email], (err, result) =>{
            if(err){
                logError(db,{tableType:"subscribers",message:error.message})
                res.json({message:"Sorry an error occurred"})
            }
            if(result.length === 0){
                let sql = 'INSERT INTO subscribers SET ?'
                db.query(sql, {email:data.email,status:1}, (err, result) =>{
                    if(err) {
                        logError(db,{tableType:"subscribers",message:err.message})
                        res.json({message:"Sorry an error occurred"})
                    }
                    res.json({message: "Thank you for signing up."})
                })
            }
            res.json({message:"Email address already exist"})
        })       
    }
    logError(db,{tableType:"subscribers",message:"An empty form or invalid email was submitted"})
    res.json({message:"Please enter a valid email"})
})
// when making a donation
router.post("/donateNow", async (req,res) =>{
    let nameError = emailError = phoneError = amountError = "";
    const data = req.body
    let transResult = await verifyPaystackPayment(data,paystack)
    if(!transResult.error){
        const name = data.username
        const email = data.email
        const phone = parseInt(data.phone)
        const amount = parseInt(transResult.data.amount / 100)
        let isValid = true
        if(name.trim() === "") {
            nameError = "Please enter your name"
            isValid = false
        }
        if(email.trim() === "") {
            emailError = "Please enter your email address"
            isValid = false
        }
        if(isNaN(phone) || phone.toString().length < 10){
            phoneError = "Please enter a valid phone number"
            isValid = false
        }
        if(isNaN(amount) || amount < 500){
            amountError = "Please enter a valid amount"
            isValid = false
        }
        if(isValid){
            let sql = "INSERT INTO donations SET ?"
            db.query(sql, {name,email,phone,amount,status:data.status,message:data.message,paidFor:1,reference:data.reference,date:new Date()},(err,result) =>{
                if(err){
                    logError(db,{ tableType: "donations", message: transResult.message })
                    res.send({message: "Sorry an error occurred, processiong your transaction request. Please contact us."})
                }
                res.send({message: "Transaction Successful,Thanks for your support"})
            })
        }
        else{
            logError(db,{ tableType: "donations", message: "Transaction details not provided" })
            res.send({message: "Sorry an error occurred, processiong your transaction request. Please contact us."})
        }
    }
    else{
        logError(db,{ tableType: "donations", message: transResult.message })
        res.send({message: "Sorry an error occurred, processiong your transaction request. Please contact us."})
    }
})
module.exports = router