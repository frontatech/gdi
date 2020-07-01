let express = require('express')
let router = express.Router()
let db = require('./db')
let slugify =  require('slugify')
let paystack = require('paystack')('sk_test_14199c12c5c6aeadacf3819c05238fb6a65d84e4');
let {handleImageFileUpload,isEmpty} = require('./fileUpload')
let {verifyPaystackPayment, logError,removeUploadedFile,removeFiles} = require('./helper')
let fs = require('fs')




// adding new event
// adding an event post to database
const EVENT_DIR = "./public/event_images/";
const EVENT_FILENAME = "fileToUpload";
const EVENT_SIZE = 7
const acceptEventFile = handleImageFileUpload(EVENT_DIR,EVENT_FILENAME,EVENT_SIZE)
router.post('/addevent', async (req,res) =>{
    let eventStatus = false
    let isError = false
    await acceptEventFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({eventStatus,message: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let eventBg = fileurl + '/event_images/' +req.files[0].filename
        let localUrl = EVENT_DIR + req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        if(isEmpty(data))return res.status(400).json({eventStatus,contentError:"Sorry you are not permitted to add data"})
        if(data.eventTitle === "") isError = true
        if(data.eventContent === "") isError =  true
        if(data.eventDescript === "") isError = true
        if(data.eventAuthor === "") isError = true 
        if(data.eventStartDate === "") isError =true
        if(data.eventEndDate === "") isError = true
        if(data.eventTags === "") isError = true
        if(isError){
            // else remove the uploaded file
            return removeUploadedFile(res, localUrl, 'error', {message:"Make sure you entered all fields",postStatus})
        }
        else{
            let event_slug = slugify(data.eventTitle,{lower:true,strict:true}).trim()
            let event = {event_author: data.eventAuthor, event_content: data.eventContent, event_descript: data.eventDescript, event_title: data.eventTitle, event_date: new Date(), event_slug, event_bg: eventBg, event_start_date: data.eventStartDate, event_end_date: data.eventEndDate, event_tags:data.eventTags,event_expired:false}
            console.log(event_slug)
            let sql = "INSERT INTO events SET ?"
            db.query(sql, event, (err, result) =>{
                console.log(err)
                if(err){
                    // logError(db,{tableType: "posts",message:err.message})
                    return res.status(400).json({eventStatus,contentError:"Sorry an error occured trying to add post"})
                }
                eventStatus = true
                return res.json({message: 'Event Added Successfully',eventStatus})
            })
            
        }
        
    })
})

// adding new event
// adding an event post to database
const REQUEST_DIR = "./public/request_images/";
const REQUEST_FILENAME = "fileToUpload";
const REQUEST_SIZE = 7
const acceptRequestFile = handleImageFileUpload(REQUEST_DIR,REQUEST_FILENAME,REQUEST_SIZE)
router.post('/addRequest', async (req,res) =>{
    let reqStatus = false
    let isError = false
    await acceptRequestFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({reqStatus,message: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let requestBg = fileurl + '/request_images/' +req.files[0].filename
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
                    return res.status(400).json({reqStatus,error:"Sorry an error occured trying to add post"})
                }
                reqStatus = true
                return res.json({message: 'Request Added Successfully',reqStatus})
            })
            
        }
        
    })
})

// adding new admin in the db
router.post("/addAdmin",(req,res)=>{
    console.log('request arrived')
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    if(data.adminUsername === "") isError = true
    if(data.adminRole === "") isError =  true
    if(data.adminPassword === "") isError =  true
    if(isError) return res.status(400).json({err:'All Fields are Required'})
    let sql = "SELECT * FROM users WHERE username = ?"
    db.query(sql,[data.adminUsername],(err, result) =>{
        console.log(result)
        if(err){
            return res.status(404).json({err: "Sorry, an error occurred"})
        }
        if(result.length !== 0){
            return res.status(201).json({err: "Username is already taken"})
        }
        const user = {username:data.adminUsername,email: '',password:data.adminPassword,status:data.adminRole,full_name:"",photo_url:'',fb_link:"", instalink:"",twitter_link:"",linkedin:""}
        let query = "INSERT INTO users SET ?"
        db.query(query, user, (err, success) =>{
            if(err) {
                return res.status(500).json({err:"Registration not Successful, An Error Occured"})
           }
           return res.json({message:"Registration Successful"})

        })
        
    })
    
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
        db.beginTransaction((dbErr) =>{
            if(dbErr) return res.status(500).json({isError,error:"Sorry an error occured trying to execute command. Please contact admin"})
            let sql = "INSERT INTO members SET ?"
            db.query(sql, member, (err, result) =>{
                console.log(err)
                if(err){
                    return res.status(500).json({isError,error:"Sorry an error occured and command aborted. Please contact admin"})
                }
                const member_id = result.insertId
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
                        res.json({message: 'Member Added Successfully',isError})
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
router.post("/uploadToGallery", async (req,res)=>{
    console.log('upload request arrived')
    let isError = false
    await acceptGalleryFiles.uploadFile(req,res,(err) =>{
        console.log(req.files)
        console.log(err)
        if(err) return res.status(400).json({isError,message: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        // let files = fileurl + '/gallery_images/' +req.files[0].filename
        // let localUrl = GALLERY_DIR + req.files[0].filename
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
    })
})

// getting all the blog posts
router.get("/members",(req,res)=>{
    console.log('request arrived')
    let sql = "SELECT * FROM members,academics,experience WHERE members.member_id = academics.member_id AND members.member_id = experience.member_id LIMIT 60;SELECT COUNT(*) as total FROM members"
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

// adding blog post to database
const IMAGE_DIR = "./public/post_images/";
const IMAGE_FILENAME = "fileToUpload";
const INPUT_SIZE = 7
const acceptImageFile = handleImageFileUpload(IMAGE_DIR,IMAGE_FILENAME,INPUT_SIZE)
router.post('/addpost', async (req,res) =>{
    let postStatus = false
    let isError = false
    await acceptImageFile.uploadFile(req,res,(err) =>{
        console.log(req.files)
        if(err) return res.status(400).json({postStatus,message: "Only .png, .jpg or .jpeg format allowed"})
        const fileurl = req.protocol + '://'+ req.get('host')
        let postBg = fileurl + '/post_images/' +req.files[0].filename
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
                return res.json({message: 'Post Added Successfully',postStatus})
            })
            
        }
        
    })
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
// loading more post from the database
router.post("/loadMorePosts",(req,res)=>{
    console.log('request arrived')
    console.log(req.body)
    const lastId = req.body.lastId
    if(!isNaN(lastId)){
        console.log(lastId)
        let sql = `SELECT * FROM posts WHERE post_id < ? ORDER BY post_id desc LIMIT 10`
        db.query(sql,[lastId],(err, result) =>{
            // console.log(err)
            // console.log(result)
            if(err){
                //logError(db,{tableType: "posts",message:err.message})
                return res.json({message: "Sorry, an error occurred"})
            }
            else{
                return res.json({posts:result})
            }
            
        })
    }
    // logError(db,{tableType: "posts",message:"No post id was sent to load more post"})
    // return res.json({message: "Sorry, an error occurred"})
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
                logError(db,{tableType: "posts",message:err.message})
                return res.json({message: "Sorry, an error occurred"})
            }
            res.json({comments:result})
        })
    } 
    logError(db,{tableType: "post_comments",message:"No post is and commenent id was sent!"})
    return res.json({message: "Sorry, an error occurred"})   
})
// submitting post comment
router.post("/postComment",(req, res) =>{
    const data = req.body
    let status = false;
    let nameError = emailError = msgError = idError = "";
    if(data.name === "") nameError = "Enter Your Name"
    if(data.email === "") emailError = "Enter Your Email Address"
    if(data.message === "") msgError = "Enter Your Comment"
    if(isNaN(data.postId)) idError = "Wrong Post Comment Sent"
    if(nameError === "" && emailError === "" && msgError === "" && idError === ""){
        const comment = {name:data.name,email:data.email,comment:data.message,date:new Date(),post_id: data.postId}
        let sql = "INSERT INTO post_comments SET ?"
        db.query(sql,comment,(err, result) =>{
            if(err){
                logError(db,{tableType: "post_comments",message:err.message})
                return res.json({nameError,emailError,msgError:"Sorry an error occurred and we're notified. We will fix it in due course.Thanks",status})
            }
            return res.json({nameError,emailError,status:true,comment})
        })
    }
    return res.json({nameError,emailError,msgError,idError,status})
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



// add course to mysql database.
const DIR = "./public/course-images/";
const FILENAME = "courseBanner";
const SIZE = 7
const acceptFile = handleImageFileUpload(DIR,FILENAME,SIZE)
router.post('/addcourse', async (req,res) =>{
    console.log(req.body)
    let postStatus = false
    await acceptFile.uploadFile(req,res,(err) =>{
        if(req.files.length === 0 || !isEmpty(err)){
            let courseBgError = "Please select a file"
            if(err !== undefined) courseBgError = err.error
            return res.json({postStatus,courseBgError})
        }
        const fileurl = req.protocol + '://'+ req.get('host')
        let courseUrl = DIR +req.files[0].filename
        let courseBanner = fileurl + '/public/course-images/' +req.files[0].filename
        console.log(courseBanner)
        let data = JSON.parse(JSON.stringify(req.body))
        console.log(data)
        let contentError = titleError = descriptError  = durationError  = tagError = "";
        if(isEmpty(data))return res.json({postStatus,contentError:"Sorry you are not permitted to add a course"})
        if(data.courseContent === "") contentError = "Please enter more course content"
        if(data.courseTitle === "") titleError = "Please enter course title"
        if(data.courseDescript === "") descriptError = "Please enter course description"
        if(data.courseTags === "") tagError = "Please enter course tags" 
        if(data.courseDuration === "" || data.courseDuration === "Select Duration") durationError = "Please select course duration" 
        if(contentError === "" && titleError === "" && durationError === "" && descriptError === "" && tagError === ""){
            
            let courseSlug = slugify(data.courseTitle,{lower:true,strict:true}).trim()
            let course = {courseContent:data.courseContent,courseTitle:data.courseTitle,courseDescript:data.courseDescript,courseTags:data.courseTags,courseDuration:data.courseDuration,courseBanner, courseDate: new Date(), courseSlug}
            console.log(courseSlug)
            let sql = "INSERT INTO courses SET ?"
            db.query(sql, course, (err, result) =>{
                if(err){
                    const data = {contentError:"An error occurred,please try again later",titleError,descriptError,durationError,tagError,postStatus}
                    return removeUploadedFile(res,fileurl,'error',data)
                }
                postStatus = true
                res.json({contentError,titleError,descriptError,durationError,tagError,postStatus})
            })
            
        }
        else{
            const data = {contentError:"An error occurred,please try again later",titleError,descriptError,durationError,tagError,postStatus}
            
            
        }
    })
    

})

//adding a newsletter to the database
router.post('/newsletter', (req,res) =>{
    let data = JSON.parse(JSON.stringify(req.body))
    if(data.email.trim() !== ""){
        let query = `SELECT * FROM newsletter WHERE email = ?`
        db.query(query, [data.email], (err, result) =>{
            if(err){
                logError(db,{tableType:"newsletter",message:error.message})
                res.json({message:"Sorry an error occurred"})
            }
            if(result.length === 0){
                let sql = 'INSERT INTO newsletter SET ?'
                db.query(sql, {email:data.email,status:1}, (err, result) =>{
                    if(err) {
                        logError(db,{tableType:"newsletter",message:err.message})
                        res.json({message:"Sorry an error occurred"})
                    }
                    res.json({message: "Thank you for signing up."})
                })
            }
            res.json({message:"Email address already exist"})
        })       
    }
    logError(db,{tableType:"newsletter",message:"An empty form or invalid email was submitted"})
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